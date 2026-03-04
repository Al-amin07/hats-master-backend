import { Types } from 'mongoose';
import { ICap } from './product.interface';
import { CapModel } from './product.model';
import ApppError from '../../error/AppError';
import status from 'http-status';

export type CreateCapInput = Omit<
  ICap,
  'createdAt' | 'updatedAt' | 'isActive' | 'displayOrder'
> & {
  isActive?: boolean;
  displayOrder?: number;
};

export type UpdateCapInput = Partial<CreateCapInput>;

export type FindCapsQuery = {
  q?: string;
  isActive?: string | boolean;
  page?: string | number;
  limit?: string | number;
};

function toBool(v: any): boolean | undefined {
  if (v === undefined || v === null || v === '') return undefined;
  if (typeof v === 'boolean') return v;
  const s = String(v).toLowerCase();
  if (s === 'true') return true;
  if (s === 'false') return false;
  return undefined;
}

export const CapService = {
  async create(payload: CreateCapInput) {
    const isCapExist = await CapModel.exists({ name: payload.name });
    if (isCapExist) {
      throw new ApppError(
        status.CONFLICT,
        `Cap with name '${payload.name}' already exists`,
      );
    }
    const totalCaps = await CapModel.countDocuments();
    const doc = await CapModel.create({
      ...payload,
      isActive: payload.isActive ?? true,
      displayOrder: totalCaps + 1,
    });
    return doc.toObject();
  },

  async findAll(query: FindCapsQuery) {
    const page = Math.max(1, Number(query.page ?? 1) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 10) || 10));
    const skip = (page - 1) * limit;

    const filter: any = {};
    const isActive = toBool(query.isActive);
    if (typeof isActive === 'boolean') filter.isActive = isActive;

    const q = (query.q ?? '').toString().trim();
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
      // if you prefer text search:
      // filter.$text = { $search: q };
    }

    const [items, total] = await Promise.all([
      CapModel.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CapModel.countDocuments(filter),
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: items,
    };
  },

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const result = await CapModel.findById(id).lean();
    if (!result) {
      throw new ApppError(status.NOT_FOUND, 'Cap not found');
    }
    return result;
  },

  async update(id: string, payload: UpdateCapInput) {
    if (!Types.ObjectId.isValid(id)) return null;
    const isCapExist = await CapModel.findById(id);
    if (!isCapExist) {
      throw new ApppError(status.NOT_FOUND, 'Cap not found');
    }
    if (payload.displayOrder) {
      const isTargettedCapExist = await CapModel.findOne({
        displayOrder: payload?.displayOrder,
      });
      if (!isTargettedCapExist) {
        throw new ApppError(status.NOT_FOUND, 'targetted cap not found');
      }
      const updatedTargetCap = await CapModel.findByIdAndUpdate(
        isTargettedCapExist?.id,
        { displayOrder: isCapExist?.displayOrder },
        { new: true },
      );
      console.log({updatedTargetCap, isTargettedCapExist})
    }
    const updated = await CapModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true },
    ).lean();

    return updated;
  },

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const isCapExist = await CapModel.findById(id)
    console.log({isCapExist})
    if (!isCapExist) {
      throw new ApppError(status.NOT_FOUND, 'Cap not found')
    }
    const deleted = await CapModel.findByIdAndDelete(id).lean();
    return deleted;
  },

  // optional helpers
  async toggleActive(id: string, isActive: boolean) {
    return this.update(id, { isActive });
  },

  async reorder(id: string, displayOrder: number) {
    return this.update(id, { displayOrder });
  },
};
