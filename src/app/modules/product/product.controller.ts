import type { Request, Response, NextFunction } from 'express';
import { CapService } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const create = catchAsync(async (req, res) => {
  const result = await CapService.create(req.body)
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Products created successfully',
    data: result
  })
})
const findMany = catchAsync(async (req, res) => {
  const result = await CapService.findAll(req.query)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Products retrived successfully',
    data: result?.data,
    meta: result?.meta
  })
})
const findById = catchAsync(async (req, res) => {
  const {productId} = req.params
  const result = await CapService.findById(productId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product retrived successfully',
    data: result
  })
})

const update = catchAsync(async (req, res) => {
  const {productId} = req.params
  const result = await CapService.update(productId, req.body)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product updated successfully',
    data: result
  })
})
const remove = catchAsync(async (req, res) => {
  const {productId} = req.params
  const result = await CapService.remove(productId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result
  })
})



  

  // optional
  async function toggleActive(req: Request, res: Response, next: NextFunction) {
    try {
      const { isActive } = req.body as { isActive: boolean };
      const updated = await CapService.toggleActive(
        req.params.id,
        Boolean(isActive),
      );
      if (!updated)
        return res
          .status(404)
          .json({ success: false, message: 'Cap not found' });
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  }

  async function reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { displayOrder } = req.body as { displayOrder: number };
      const updated = await CapService.reorder(
        req.params.id,
        Number(displayOrder),
      );
      if (!updated)
        return res
          .status(404)
          .json({ success: false, message: 'Cap not found' });
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  }


export const CapController = {
  create,
  findMany,
  findById,
  update,
  remove
};
