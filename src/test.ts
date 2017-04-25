import "./polyfills";
import "angular-mocks";
import "./main.ts";

const testsContext = require.context("../src/", true, /.*\.spec\.ts$/);

testsContext.keys().forEach(testsContext);