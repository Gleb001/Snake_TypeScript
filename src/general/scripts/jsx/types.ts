// types ======================================================= //

// declare namespace ------------------------------------------- //
declare global {
    namespace JSX {

        // main parts DOM element ------------------------------ //
        type Tags = keyof HTMLElementTagNameMap
        type Children = (Node | HTMLElement)[]
        type ValueProp = any | keyof GlobalEventHandlers
        interface Props { [nameProp: string]: ValueProp }

        // special JS-DOM element ------------------------------ //
        function FunctionComponentHTML<
            Element = HTMLElement, Props = {}
        >(
            props: Props, children: Children
        ): Element

        interface ObjectComponentHTML<Element = HTMLElement, Props = any> {
            HTML: Element, render: (props: Props, children: Children) => Element
        }

        // For JSX implementation ------------------------------ //
        type IntrinsicElements = {
            [Key: keyof HTMLElementTagNameMap | string]: {
                [Key: string]: any
            }
        }

    }
}

// function types ---------------------------------------------- //
type createHTMLElementType = (
    tag: JSX.Tags |
         typeof JSX.FunctionComponentHTML |
         JSX.ObjectComponentHTML,
    attributes?: JSX.Props,
    ...children: JSX.Children
) => HTMLElement

type createElementType = (
    tag: JSX.Tags,
    attributes?: JSX.Props,
    ...children: JSX.Children
) => HTMLElement

type setAttributesType = (
    element: HTMLElement,
    attributes?: JSX.Props
) => HTMLElement

type setChildrenType = (
    element: HTMLElement,
    ...children: JSX.Children
) => HTMLElement

// export ====================================================== //
export default {global};
export {
    createHTMLElementType,
    createElementType,
    setAttributesType,
    setChildrenType
};