import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Patch,
  Delete,
} from "@decorators/express";
import { Request, Response } from "express";
import Note from "../Entity/Note";

@Controller("/notes")
export default class NotesController {
  @Get("/")
  async getAllNotes(@Res() res: Response, @Req() req: Request) {
    const notes = await Note.find();
    res.json(notes);
  }

  @Post("/")
  createNote(@Res() res: Response, @Req() req: Request) {
    const { title, desc } = req.query;
    console.log(title, desc);
    const newNote: any = new Note();
    if (!title) {
      return res.json({
        messege: "Please provide a title",
      });
    }
    newNote.title = title;

    if (!desc) {
      newNote.desc = " ";
    } else {
      newNote.desc = desc;
    }

    newNote
      .save()
      .then((e: any) => console.log(`created note with id: ${e.id}`));
    res.json(req.query);
  }

  @Patch("/:id")
  editNote(@Res() res: Response, @Req() req: Request) {
    const { title, desc } = req.query;
    const { id } = req.params;
    if (!title) {
      return res.json({ messege: "please provide a title" });
    }

    const newNote: any = {
      title,
    };
    if (desc) {
      newNote.desc = desc;
    }
    console.log(req.params);
    Note.update(
      {
        id: +id,
      },
      { ...newNote }
    )
      .then((e: any) => console.log("updated"))
      .catch((e) => console.log(`error ${e}`));

    res.json(req.query);
  }

  @Delete("/:id")
  async deleteNote(@Res() res: Response, @Req() req: Request) {
    const { id } = req.params;
    Note.delete({
      id: Number(id),
    }).then((e: any) => {
      if (+e.affected === 0) {
        return res.json({ messege: "error didn't find any" });
      }
      return res.json({ messege: "Finished deleted" });
    });
  }
}
