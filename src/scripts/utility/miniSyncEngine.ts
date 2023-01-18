
// typescripts entities ======================================== //
type Algorithm = {
    name_next?: string,
    components: (() => void)[],
    trigger?: () => boolean,
}
type ListAlgorithms = { [name: string]: Algorithm }
type StatusMiniSyncEngine = "algorithm_finished" | "work" | "pause"

// main ======================================================== //
const miniSyncEngine = {

    algorithms: {

        list: {} as ListAlgorithms,

        add({
            name, name_next, components, trigger
        }: Algorithm & { name: string }): void {
            this.list[name] = { components, trigger, name_next };
        },

        get name_initial(): string {

            let list_algorithms = this.list;

            let checking_algorithms: string[] = [];
            let referenced_algorithms: string[] = [];

            // This loop checks the algorithm to see if there is
            // a link to it from other algorithm:
            // 1) If there is - this is not the initial algorithm
            // 2) If not, this is the initial algorithm (because
            // there is no link to it)
            // As a result , we get two arrays:
            // *) checking_algorithms - which contains, presumably,
            // the initial algorithm
            // *) referenced_algorithms - which contains links to
            // algorithm
            for (let algorithm in list_algorithms) {

                let name_next = list_algorithms[algorithm].name_next;

                let index_next_alg = checking_algorithms.indexOf(name_next as string);
                referenced_algorithms.push(name_next as string);

                if (referenced_algorithms.indexOf(algorithm) == -1) {
                    checking_algorithms.push(algorithm);
                } else if (index_next_alg != -1) {
                    checking_algorithms.splice(index_next_alg, 1);
                }

            }

            if(checking_algorithms.length == 0) {
                return Object.keys(list_algorithms)[0];
            } else {
                return checking_algorithms[0];
            }

        },

        current: {

            index_component: 0,
            _self: {} as Algorithm,

            get(): Algorithm { return this._self; },
            set(name_algorithm: string): void {
                if (!miniSyncEngine.algorithms.list[name_algorithm]) return;
                this._self = miniSyncEngine.algorithms.list[name_algorithm];
            },

        },

    },

    start(): void {

        // 1. checking for status
        if (this._status.get()) return;

        // 2. set an initial algorithm similar to the current one
        this.algorithms.current.set(this.algorithms.name_initial);

        // 3. launch the algorithm trigger
        this._launchTrigger();
        this._catchEndAlgorithm();

    },

    executionDelay(
        async_function: () => void, duration_delay?: number
    ): void {

        // 1. pause mini sync engine
        this._status.set("pause");

        // 2. launch asynchronous function
        async_function();

        // 3. start after pause mini sync engine
        setTimeout((): void => {
            this._status.set("work");
            this._launchAlgorithm();
        }, duration_delay);

    },



    _status: {
        _current: "",
        set(new_status: StatusMiniSyncEngine): void {
            this._current = new_status;
        },
        get(): StatusMiniSyncEngine {
            return this._current as StatusMiniSyncEngine;
        },
    },

    _launchTrigger(): void {

        // 1. set status work
        this._status.set("work");

        // 2. waiting for trigger execution to complete
        let trigger = this.algorithms.current.get().trigger;
        let id_interval = setInterval(() => {

            if (!trigger || trigger()) {
                console.log("resolve");
                clearInterval(id_interval);
                this._launchAlgorithm()
            }

        }, 30);

    },

    _launchAlgorithm(): void {

        // 1. getting and checking the current algorithm
        let algorithm = this.algorithms.current;
        let components = algorithm.get().components;

        // 2. check index the current component
        if (algorithm.index_component == components.length) {
            this._status.set("algorithm_finished");
        } else {

            components[algorithm.index_component++]();

            // 3. check status game engine
            if (this._status.get() != "pause") {
                this._launchAlgorithm();
            }

        }


    },

    _changeAlgorithm(): void {

        // 1. get name next algorithm
        let name_next_algorithm = this.algorithms.current.get().name_next;
        if(!name_next_algorithm) name_next_algorithm = "";

        // 2. check availability next algorithm
        if (!this.algorithms.list[name_next_algorithm]) {
            console.log("Алгоритмы закончились!");
        } else {

            this.algorithms.current.index_component = 0;
            this.algorithms.current.set(name_next_algorithm);
    
            this._launchTrigger();
            this._catchEndAlgorithm();
            
        }

    },

    _catchEndAlgorithm(): void {

        let id_interval = setInterval((): void => {

            if (this._status.get() == "algorithm_finished") {
                clearInterval(id_interval);
                this._changeAlgorithm();
            }

        }, 150);

    }

};

// export ====================================================== //
export default miniSyncEngine;