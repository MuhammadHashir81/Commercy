import { Router } from "express";
import { itemUploadValidationRules, uploadItem } from "../Controllers/item.controller.js";

export const  itemRouter = Router()

itemRouter.post('/upload-item',itemUploadValidationRules, uploadItem)