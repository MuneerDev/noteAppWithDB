"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const express_2 = require("@decorators/express");
const Note_1 = __importDefault(require("./Entity/Note"));
const app_1 = __importDefault(require("./Controllers/app"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, express_2.attachControllers)(app, [app_1.default]).then((e) => console.log("controller attached"));
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "NotesApp",
    username: "postgres",
    password: "admin",
    synchronize: true,
    entities: [Note_1.default],
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dataSource.initialize().then((e) => {
                console.log("Database started");
                app.listen(5001, () => console.log("server started"));
            });
        }
        catch (e) {
            console.log(`error is : ${e}`);
        }
    });
}
run();
