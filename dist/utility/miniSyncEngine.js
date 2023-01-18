const miniSyncEngine = {
    algorithms: {
        list: {},
        add({ name, name_next, components, trigger }) {
            this.list[name] = { components, trigger, name_next };
        },
        get name_initial() {
            let list_algorithms = this.list;
            let checking_algorithms = [];
            let referenced_algorithms = [];
            for (let algorithm in list_algorithms) {
                let name_next = list_algorithms[algorithm].name_next;
                let index_next_alg = checking_algorithms.indexOf(name_next);
                referenced_algorithms.push(name_next);
                if (referenced_algorithms.indexOf(algorithm) == -1) {
                    checking_algorithms.push(algorithm);
                }
                else if (index_next_alg != -1) {
                    checking_algorithms.splice(index_next_alg, 1);
                }
            }
            if (checking_algorithms.length == 0) {
                return Object.keys(list_algorithms)[0];
            }
            else {
                return checking_algorithms[0];
            }
        },
        current: {
            index_component: 0,
            _self: {},
            get() { return this._self; },
            set(name_algorithm) {
                if (!miniSyncEngine.algorithms.list[name_algorithm])
                    return;
                this._self = miniSyncEngine.algorithms.list[name_algorithm];
            },
        },
    },
    start() {
        if (this._status.get())
            return;
        this.algorithms.current.set(this.algorithms.name_initial);
        this._launchTrigger();
        this._catchEndAlgorithm();
    },
    executionDelay(async_function, duration_delay) {
        this._status.set("pause");
        async_function();
        setTimeout(() => {
            this._status.set("work");
            this._launchAlgorithm();
        }, duration_delay);
    },
    _status: {
        _current: "",
        set(new_status) {
            this._current = new_status;
        },
        get() {
            return this._current;
        },
    },
    _launchTrigger() {
        this._status.set("work");
        let trigger = this.algorithms.current.get().trigger;
        let id_interval = setInterval(() => {
            if (!trigger || trigger()) {
                console.log("resolve");
                clearInterval(id_interval);
                this._launchAlgorithm();
            }
        }, 30);
    },
    _launchAlgorithm() {
        let algorithm = this.algorithms.current;
        let components = algorithm.get().components;
        if (algorithm.index_component == components.length) {
            this._status.set("algorithm_finished");
        }
        else {
            components[algorithm.index_component++]();
            if (this._status.get() != "pause") {
                this._launchAlgorithm();
            }
        }
    },
    _changeAlgorithm() {
        let name_next_algorithm = this.algorithms.current.get().name_next;
        if (!name_next_algorithm)
            name_next_algorithm = "";
        if (!this.algorithms.list[name_next_algorithm]) {
            console.log("Алгоритмы закончились!");
        }
        else {
            this.algorithms.current.index_component = 0;
            this.algorithms.current.set(name_next_algorithm);
            this._launchTrigger();
            this._catchEndAlgorithm();
        }
    },
    _catchEndAlgorithm() {
        let id_interval = setInterval(() => {
            if (this._status.get() == "algorithm_finished") {
                clearInterval(id_interval);
                this._changeAlgorithm();
            }
        }, 150);
    }
};
export default miniSyncEngine;
