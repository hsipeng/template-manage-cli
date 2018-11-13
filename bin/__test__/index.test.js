"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var util_1 = require("../util");
test("the type function input params 'react' return '/src/react-router-redux'", function () {
    var dir = util_1.type("react");
    expect(dir).toBe("/src/react-router-redux");
});
test("8.1 > 8", function () {
    var version = util_1.compareVersion("8.1");
    expect(version).toBe(true);
});
test("7.9 > 8", function () {
    var version = util_1.compareVersion("7.9");
    expect(version).toBe(false);
});
//# sourceMappingURL=index.test.js.map