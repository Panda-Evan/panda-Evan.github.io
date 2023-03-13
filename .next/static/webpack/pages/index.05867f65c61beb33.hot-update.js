"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/comp.tsx":
/*!*****************************!*\
  !*** ./components/comp.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Comp; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/Comp.module.scss */ \"./styles/Comp.module.scss\");\n/* harmony import */ var _styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction Comp() {\n    _s();\n    const [activeButtonIndex, setActiveButtonIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const buttons = [\n        {\n            label: \"Developement Web\",\n            content: [\n                {\n                    url: \"https://nextjs.org/\",\n                    src: \"/logo_prog/web/nextjs.png\",\n                    label: \"NextJS\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_black)\n                },\n                {\n                    url: \"https://fr.reactjs.org/\",\n                    src: \"/logo_prog/web/react.webp\",\n                    label: \"ReactJS\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_blue_light)\n                },\n                {\n                    url: \"https://developer.mozilla.org/fr/docs/Web/CSS\",\n                    src: \"/logo_prog/web/css.png\",\n                    label: \"CSS\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_blue)\n                },\n                {\n                    url: \"https://sass-lang.com/\",\n                    src: \"/logo_prog/web/scss.png\",\n                    label: \"SCSS\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_pink)\n                },\n                {\n                    url: \"https://developer.mozilla.org/fr/docs/Web/JavaScript\",\n                    src: \"/logo_prog/web/js.png\",\n                    label: \"Javascript\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_yellow)\n                },\n                {\n                    url: \"https://flutter.dev/\",\n                    src: \"/logo_prog/web/flutter.png\",\n                    label: \"Flutter\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_bleu_ciel)\n                }\n            ]\n        },\n        {\n            label: \"Language de programmation\",\n            content: [\n                {\n                    url: \"https://www.python.org/\",\n                    src: \"/logo_prog/prog/python.png\",\n                    label: \"Python\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_purple)\n                },\n                {\n                    url: \"https://www.ruby-lang.org/fr/\",\n                    src: \"/logo_prog/prog/ruby.png\",\n                    label: \"Ruby\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_red)\n                },\n                {\n                    url: \"https://fr.wikipedia.org/wiki/C_(langage)\",\n                    src: \"/logo_prog/prog/C.png\",\n                    label: \"C\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_blue)\n                },\n                {\n                    url: \"https://www.lua.org/\",\n                    src: \"/logo_prog/prog/lua.png\",\n                    label: \"Lua\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_blue_dark)\n                }\n            ]\n        },\n        {\n            label: \"Autres\",\n            content: [\n                {\n                    url: \"https://git-scm.com/\",\n                    src: \"/logo_prog/other/git.png\",\n                    label: \"Git\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_orange)\n                },\n                {\n                    src: \"/logo_prog/other/figma.png\",\n                    label: \"Figma\",\n                    badgeClass: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().badge_green)\n                }\n            ]\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().div),\n        id: \"competence\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                src: \"/wave/wave1.svg\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                lineNumber: 98,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().div_doc),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"text\", {\n                        children: \"Comp\\xe9tences\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().div_button),\n                                children: buttons.map((button, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: activeButtonIndex === index ? (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().active) : (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().button),\n                                        onClick: ()=>setActiveButtonIndex(index),\n                                        children: button.label\n                                    }, index, false, {\n                                        fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                        lineNumber: 104,\n                                        columnNumber: 15\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                lineNumber: 102,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().div_ap),\n                                children: buttons[activeButtonIndex].content.map((content, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        target: \"_blank\",\n                                        href: content.url,\n                                        className: content.badgeClass,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().circle),\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                                    src: content.src\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                                    lineNumber: 124,\n                                                    columnNumber: 19\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().ribbon),\n                                                    children: content.label\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                                    lineNumber: 125,\n                                                    columnNumber: 19\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                            lineNumber: 123,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, index, false, {\n                                        fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                        lineNumber: 117,\n                                        columnNumber: 15\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                                lineNumber: 115,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                        lineNumber: 101,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                className: (_styles_Comp_module_scss__WEBPACK_IMPORTED_MODULE_2___default().svg),\n                src: \"/wave/wave2.svg\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n                lineNumber: 132,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\evanq\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\Panda-Evan.github.io\\\\components\\\\comp.tsx\",\n        lineNumber: 97,\n        columnNumber: 5\n    }, this);\n}\n_s(Comp, \"9P5Ukt1Ijj6nrFhIrgYy+WOvE4M=\");\n_c = Comp;\nvar _c;\n$RefreshReg$(_c, \"Comp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OzswQkFjZiw4REFBQ1A7Z0JBQUlGLFdBQVd0QixxRUFBVTtnQkFBRVEsS0FBSTs7Ozs7Ozs7Ozs7O0FBR3RDLENBQUM7R0FuSXVCUDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL2NvbXAudHN4PzE3MzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQ29tcC5tb2R1bGUuc2Nzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcCgpIHtcclxuICBjb25zdCBbYWN0aXZlQnV0dG9uSW5kZXgsIHNldEFjdGl2ZUJ1dHRvbkluZGV4XSA9IHVzZVN0YXRlKDApO1xyXG5cclxuICBjb25zdCBidXR0b25zID0gW1xyXG4gICAge1xyXG4gICAgICBsYWJlbDogXCJEZXZlbG9wZW1lbnQgV2ViXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cmw6XCJodHRwczovL25leHRqcy5vcmcvXCIsXHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ29fcHJvZy93ZWIvbmV4dGpzLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiTmV4dEpTXCIsXHJcbiAgICAgICAgICBiYWRnZUNsYXNzOiBzdHlsZXMuYmFkZ2VfYmxhY2ssXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cmw6XCJodHRwczovL2ZyLnJlYWN0anMub3JnL1wiLFxyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvX3Byb2cvd2ViL3JlYWN0LndlYnBcIixcclxuICAgICAgICAgIGxhYmVsOiBcIlJlYWN0SlNcIixcclxuICAgICAgICAgIGJhZGdlQ2xhc3M6IHN0eWxlcy5iYWRnZV9ibHVlX2xpZ2h0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXJsOlwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZnIvZG9jcy9XZWIvQ1NTXCIsXHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ29fcHJvZy93ZWIvY3NzLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiQ1NTXCIsXHJcbiAgICAgICAgICBiYWRnZUNsYXNzOiBzdHlsZXMuYmFkZ2VfYmx1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHVybDpcImh0dHBzOi8vc2Fzcy1sYW5nLmNvbS9cIixcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL3dlYi9zY3NzLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiU0NTU1wiLFxyXG4gICAgICAgICAgYmFkZ2VDbGFzczogc3R5bGVzLmJhZGdlX3BpbmssXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cmw6XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9KYXZhU2NyaXB0XCIsXHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ29fcHJvZy93ZWIvanMucG5nXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJKYXZhc2NyaXB0XCIsXHJcbiAgICAgICAgICBiYWRnZUNsYXNzOiBzdHlsZXMuYmFkZ2VfeWVsbG93LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXJsOlwiaHR0cHM6Ly9mbHV0dGVyLmRldi9cIixcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL3dlYi9mbHV0dGVyLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiRmx1dHRlclwiLFxyXG4gICAgICAgICAgYmFkZ2VDbGFzczogc3R5bGVzLmJhZGdlX2JsZXVfY2llbCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbGFiZWw6IFwiTGFuZ3VhZ2UgZGUgcHJvZ3JhbW1hdGlvblwiLFxyXG4gICAgICBjb250ZW50OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXJsOlwiaHR0cHM6Ly93d3cucHl0aG9uLm9yZy9cIixcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL3Byb2cvcHl0aG9uLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiUHl0aG9uXCIsXHJcbiAgICAgICAgICBiYWRnZUNsYXNzOiBzdHlsZXMuYmFkZ2VfcHVycGxlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXJsOlwiaHR0cHM6Ly93d3cucnVieS1sYW5nLm9yZy9mci9cIixcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL3Byb2cvcnVieS5wbmdcIixcclxuICAgICAgICAgIGxhYmVsOiBcIlJ1YnlcIixcclxuICAgICAgICAgIGJhZGdlQ2xhc3M6IHN0eWxlcy5iYWRnZV9yZWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cmw6XCJodHRwczovL2ZyLndpa2lwZWRpYS5vcmcvd2lraS9DXyhsYW5nYWdlKVwiLFxyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvX3Byb2cvcHJvZy9DLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiQ1wiLFxyXG4gICAgICAgICAgYmFkZ2VDbGFzczogc3R5bGVzLmJhZGdlX2JsdWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cmw6XCJodHRwczovL3d3dy5sdWEub3JnL1wiLFxyXG4gICAgICAgICAgc3JjOiBcIi9sb2dvX3Byb2cvcHJvZy9sdWEucG5nXCIsXHJcbiAgICAgICAgICBsYWJlbDogXCJMdWFcIixcclxuICAgICAgICAgIGJhZGdlQ2xhc3M6IHN0eWxlcy5iYWRnZV9ibHVlX2RhcmssXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGxhYmVsOiBcIkF1dHJlc1wiLFxyXG4gICAgICBjb250ZW50OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXJsOlwiaHR0cHM6Ly9naXQtc2NtLmNvbS9cIixcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL290aGVyL2dpdC5wbmdcIixcclxuICAgICAgICAgIGxhYmVsOiBcIkdpdFwiLFxyXG4gICAgICAgICAgYmFkZ2VDbGFzczogc3R5bGVzLmJhZGdlX29yYW5nZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogXCIvbG9nb19wcm9nL290aGVyL2ZpZ21hLnBuZ1wiLFxyXG4gICAgICAgICAgbGFiZWw6IFwiRmlnbWFcIixcclxuICAgICAgICAgIGJhZGdlQ2xhc3M6IHN0eWxlcy5iYWRnZV9ncmVlbixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kaXZ9IGlkPVwiY29tcGV0ZW5jZVwiPlxyXG4gICAgICA8aW1nIHNyYz1cIi93YXZlL3dhdmUxLnN2Z1wiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGl2X2RvY30+XHJcbiAgICAgICAgPHRleHQ+Q29tcMOpdGVuY2VzPC90ZXh0PlxyXG4gICAgICAgIDxuYXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRpdl9idXR0b259PlxyXG4gICAgICAgICAgICB7YnV0dG9ucy5tYXAoKGJ1dHRvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICAgYWN0aXZlQnV0dG9uSW5kZXggPT09IGluZGV4ID8gc3R5bGVzLmFjdGl2ZSA6IHN0eWxlcy5idXR0b25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZUJ1dHRvbkluZGV4KGluZGV4KX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7YnV0dG9uLmxhYmVsfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kaXZfYXB9PlxyXG4gICAgICAgICAgICB7YnV0dG9uc1thY3RpdmVCdXR0b25JbmRleF0uY29udGVudC5tYXAoKGNvbnRlbnQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgaHJlZj17Y29udGVudC51cmx9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NvbnRlbnQuYmFkZ2VDbGFzc31cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNpcmNsZX0+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtjb250ZW50LnNyY30gLz5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yaWJib259Pntjb250ZW50LmxhYmVsfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGltZyBjbGFzc05hbWU9e3N0eWxlcy5zdmd9IHNyYz1cIi93YXZlL3dhdmUyLnN2Z1wiIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInN0eWxlcyIsIkNvbXAiLCJhY3RpdmVCdXR0b25JbmRleCIsInNldEFjdGl2ZUJ1dHRvbkluZGV4IiwiYnV0dG9ucyIsImxhYmVsIiwiY29udGVudCIsInVybCIsInNyYyIsImJhZGdlQ2xhc3MiLCJiYWRnZV9ibGFjayIsImJhZGdlX2JsdWVfbGlnaHQiLCJiYWRnZV9ibHVlIiwiYmFkZ2VfcGluayIsImJhZGdlX3llbGxvdyIsImJhZGdlX2JsZXVfY2llbCIsImJhZGdlX3B1cnBsZSIsImJhZGdlX3JlZCIsImJhZGdlX2JsdWVfZGFyayIsImJhZGdlX29yYW5nZSIsImJhZGdlX2dyZWVuIiwiZGl2IiwiY2xhc3NOYW1lIiwiaWQiLCJpbWciLCJkaXZfZG9jIiwidGV4dCIsIm5hdiIsImRpdl9idXR0b24iLCJtYXAiLCJidXR0b24iLCJpbmRleCIsImFjdGl2ZSIsIm9uQ2xpY2siLCJkaXZfYXAiLCJhIiwidGFyZ2V0IiwiaHJlZiIsImNpcmNsZSIsInJpYmJvbiIsInN2ZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/comp.tsx\n"));

/***/ })

});