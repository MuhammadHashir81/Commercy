import { Router } from "express";
import { decrementInventory, getAllItems, getSingleItem, itemUploadValidationRules, uploadItem } from "../Controllers/item.controller.js";

export const  itemRouter = Router()

itemRouter.post('/upload-item',itemUploadValidationRules, uploadItem)
itemRouter.get('/get-all-items',getAllItems)
itemRouter.get('/get-single-item/:id',getSingleItem)
itemRouter.post('/decrement-inventory/',decrementInventory)