"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const express_1 = require("@decorators/express");
const Note_1 = __importDefault(require("../Entity/Note"));
let NotesController = class NotesController {
    getAllNotes(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield Note_1.default.find();
            res.json(notes);
        });
    }
    createNote(res, req) {
        const { title, desc } = req.query;
        console.log(title, desc);
        const newNote = new Note_1.default();
        if (!title) {
            return res.json({
                messege: "Please provide a title",
            });
        }
        newNote.title = title;
        if (!desc) {
            newNote.desc = " ";
        }
        else {
            newNote.desc = desc;
        }
        newNote
            .save()
            .then((e) => console.log(`created note with id: ${e.id}`));
        res.json(req.query);
    }
    editNote(res, req) {
        const { title, desc } = req.query;
        const { id } = req.params;
        if (!title) {
            return res.json({ messege: "please provide a title" });
        }
        const newNote = {
            title,
        };
        if (desc) {
            newNote.desc = desc;
        }
        console.log(req.params);
        Note_1.default.update({
            id: +id,
        }, Object.assign({}, newNote))
            .then((e) => console.log("updated"))
            .catch((e) => console.log(`error ${e}`));
        res.json(req.query);
    }
    deleteNote(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            Note_1.default.delete({
                id: Number(id),
            }).then((e) => {
                if (+e.affected === 0) {
                    return res.json({ messege: "error didn't find any" });
                }
                return res.json({ messege: "Finished deleted" });
            });
        });
    }
};
__decorate([
    (0, express_1.Get)("/"),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getAllNotes", null);
__decorate([
    (0, express_1.Post)("/"),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, express_1.Patch)("/:id"),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "editNote", null);
__decorate([
    (0, express_1.Delete)("/:id"),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteNote", null);
NotesController = __decorate([
    (0, express_1.Controller)("/notes")
], NotesController);
exports.default = NotesController;
