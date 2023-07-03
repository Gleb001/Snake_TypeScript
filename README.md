# Table of contents

* [Snake_TypeScript (ru)](#snake_typescript-ru)
* [Snake_TypeScript (en)](#snake_typescript-en)

# Snake_TypeScript (ru)

## Вступление
Привет, представляю тебе мой небольшой домашний проект, целью которого было отточить навыки в области программирования на [TypeScript](https://www.typescriptlang.org/). Если покопаться в коде данного проекта, то можно увидеть очень много достаточно странных и возмутимых решений. Безусловно, я бы сам многое исправил и в корне переписал, но, увы, я решил оставить всё как есть, так как обновление кода сотрёт мои лучшие наработки того времени (декабрь 2022 года) и тем не менее отнимет у меня достаточно времени. Ниже есть ссылка на игру, а также описание идей вложенных в проект.

Поиграть в змейку можно по следующей ссылке: https://gleb001.github.io/Snake_TypeScript/demo/

## Основная часть
"Основная часть" описания проекта поделена на две части, где первая раскрывает основной работоспособный код "веб-приложения", а вторая - самописные библиотеки и [хелперы (helpers)](https://stackoverflow.com/questions/19270178/what-are-helper-functions-in-c).

* [Первая часть. Основной код](#первая-часть-основной-код)
* [Вторая часть. Вспомогательный код](#вторая-часть-вспомогательный-код)

### Первая часть. Основной код
Основной код данного проекта расположен в директории: src/app. Как было подмечено выше данная часть проекта полностью зависит от второй части. Об этом нужно помнить всякий раз, когда вы хотите изменить код из второй части.

Данный проект полностью реализован на использовании объектов в перемешку с [JSX синтаксисом](https://en.wikipedia.org/wiki/JSX_(JavaScript)) ([огромнейшая моя ошибка - причина, по которой нужно переписать данный проект](#заключение)). Вследствие чего, шаблон компонента имеет следующий вид:

```js
const NameComponent = {
    HTML: <div></div>,
    render(props, ...children) {
        this.apppend(...children);
    },
    // ...
    // дополнительные методы и свойства
    // в зависимости от специфики компонента
    // ...
};
```

Причина, по которой компонент является именно объектом (а не функцией или классом, как в [React](https://react.dev/)), заключается в идеи, что данные компоненты приложения могут взаимодействовать друг с другом после рендера, обращаясь друг с другом через заложенные в них свойства и методы (например, один компонент может получить html-ссылку на другой через обязательное свойство HTML (см. код выше)).

Также следует обратить ваше внимание на то, что в коде при вызове данного рода компонентов перед ним ставиться '@ts-ignore' блок, что вызвано достаточно специфичным использованием JSX (см. код ниже). Если вы знаете как исправить это, буду очень рад получить обратную связь!

```ts
// @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
<NameComponent />
```

Следующим не менне важным моментом следует файловая структура проекта, которая представлена в иерархичном порядке использования, то есть то, как компоненты вложены друг в друга непосредственно в JSX синтаксисе, так они и располагаются относительно друг друга в файловой стрктуре (см. пример ниже).

```jsx
<app>
    <MenuGame>
        <ButtonStartGame></ButtonStartGame>
    </MenuGame>
    <PlayGame>
        <FieldGame>
            <Snake></Snake>
        </FieldGame>
    </PlayGame>
</app>
```
```txt
| app
  | menuGame
    | buttonStartGame
  | playGame
    | fieldGame
      | snake
```

Так как проект написан на TypeScript, значит, каждый компонент также обладает, помимо стилей, и типами. Для того чтобы отделить реализацию проекта от его абстрактной типизированной модели, используется отдельный файл с типами. В результаты компонент имеет следующее представление (в файловом отношении).

```txt
| nameComponent
    | index.ts    <-- точка входа
    | types.ts    <-- типы компонента
    | styles.css  <-- стили компонента
    | ...
```

### Вторая часть. Вспомогательный код
Вспомогательный код содержит библиотеки и хелперы, описание которых представлено ниже и которые расположены в директории: src/general. В целом в проекте используются следующие вспомогательные коды, разделённые на директории:

* components - часто используемые компоненты (например, в качестве данных являются tdoby и select)
* libs - JavaScript/TypeScript библиотеки и хелперы
    * animations - подробно описан в моем [предыдущем проекте](https://github.com/Gleb001/FlappyBird-Gosha#animationjs-and-animationcss-api-ru) (слегка улучшен в данном проекте)
    * functions_execution - хелперы по работе с функциями
    * range - хелпер по работе с диапазоном чисел
    * jsx - библиотека по работе с jsx/tsx
* settings_game - глобальные настройки игры/проекта. Можно сравнить с Redux, только в очень упрощенном и примитивном варианте
* styles - глобальные стили проекта

Описание функциональности данных хелперов и небольших библиотек я не вижу смысла, так как считаю, что вы с легкостью сможете рассмотреть их в коде, опираясь на типы и простой синтаксис.

## Заключение
Подводя итог проделанной работе, я бы хотел заметить, что в данном проекте я допустил огромную ошибку в том, что решил [организовать компоненты]() так, как они представлены. Ошибка заключается в ужасной работе с компонентами - компоненты внутри метода render вкладывают в себя другие компоненты, которые в свою очередь делают также! Как итог, мы видим нерациональное использование jsx/tsx библиотеки...



# Snake_TypeScript (en)

## Introduction
Hi, I present to you my small home project, the purpose of which was to hone skills in the field of programming in [TypeScript](https://www.typescriptlang.org/). If you dig into the code of this project, you can see a lot of rather strange and outraged solutions. Of course, I would have corrected a lot myself and radically rewritten it, but, alas, I decided to leave everything as it is, since updating the code will erase my best practices of that time (December 2022) and nevertheless will take me enough time. Below there is a link to the game, as well as a description of the ideas invested in the project.

You can play snake at the following link: https://gleb001.github.io/Snake_TypeScript/demo/

## The main part
The "main part" of the project description is divided into two parts, where the first reveals the main workable code of the "web application", and the second - self-written libraries and [helpers](https://stackoverflow.com/questions/19270178/what-are-helper-functions-in-c).

* [The first part. Main code](#the-first-part-main-code)
* [Second part. Auxiliary code](#the-second-part-auxiliary-code)

### The first part. Main code
The main code of this project is located in the directory: src/app. As noted above, this part of the project depends entirely on the second part. This should be remembered whenever you want to change the code from the second part.

This project is fully implemented using objects mixed with [JSX syntax](https://en.wikipedia.org/wiki/JSX_(JavaScript)) ([my biggest mistake is the reason why this project needs to be rewritten](#conclusion)). As a result, the component template has the following form:

```js
const NameComponent = {
    HTML: <div></div>,
    render(props, ...children) {
        this.apppend(...children);
    },
    // ...
    // additional methods and properties 
    // depending on the specifics of the component
    // ...
};
```

The reason why the component is exactly an object (and not a function or class, as in [React](https://react.dev/)), lies in the idea that these application components can interact with each other after rendering, addressing each other through their inherent properties and methods (for example, one component can get html-a link to another via the required HTML property (see the code above)).

You should also pay attention to the fact that in the code, when calling this kind of components, a '@ts-ignore' block is put in front of it, which is caused by a rather specific use of JSX (see the code below). If you know how to fix it, I will be very glad to receive feedback!

```ts
// @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
<NameComponent />
```

The next important point is the file structure of the project, which is presented in a hierarchical order of use, that is, how the components are nested into each other directly in the JSX syntax, so they are located relative to each other in the file structure (see the example below).

```jsx
<app>
    <MenuGame>
        <ButtonStartGame></ButtonStartGame>
    </MenuGame>
    <PlayGame>
        <FieldGame>
            <Snake></Snake>
        </FieldGame>
    </PlayGame>
</app>
```
```txt
| app
  | menuGame
    | buttonStartGame
  | playGame
    | fieldGame
      | snake
```

Since the project is written in TypeScript, it means that each component also has, in addition to styles, types. In order to separate the project implementation from its abstract typed model, a separate file with types is used. In the results, the component has the following representation (file-wise).

```txt
| nameComponent
    | index.ts    <-- entry point
    | types.ts    <-- component types
    | styles.css  <-- component styles
    | ...
```

### The second part. Auxiliary code
The auxiliary code contains libraries and helpers, which are described below and which are located in the directory: src/general. In general, the following auxiliary codes are used in the project, divided into directories:

* components - frequently used components (for example, tdoby and select are used as data)
* libs - JavaScript/TypeScript libraries and helpers
    * animations - described in detail in my [previous project](https://github.com/Gleb001/FlappyBird-Gosha#animationjs-and-animationcss-api-en ) (slightly improved in this project)
    * functions_execution - helpers for working with functions
    * range - helper for working with a range of numbers
    * jsx - library for working with jsx/tsx
* settings_game - global settings of the game/project. It can be compared with Redux, only in a very simplified and primitive version
* styles - global project styles

I don't see the point in describing the functionality of these helpers and small libraries, since I think that you can easily consider them in the code, relying on types and simple syntax.

## Conclusion
Summing up the work done, I would like to note that in this project I made a huge mistake in deciding to [organize the components]() as they are presented. The mistake lies in the terrible work with components - components inside the render method put other components into themselves, which in turn do the same! As a result, we see the irrational use of the jsx/tsx library...
