import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Bill from "../../db/models/Bills";
import Item from "../../db/models/Item";

export const get = async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    const bills = await getBills(requestData);
    const formattedBills = formatBills(bills);
    return res.send(formattedBills);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

function extractData(request: any) {
  try {
    const token = request.headers.token;
    const dataTable: any = jwt.verify(token, process.env.JWTKEY as string);
    return dataTable;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function getBills(request: any) {
  try {
    let bills = await Bill.findAll({
      where: {
        company_uuid: request.company_uuid,
      },
      include: [
        {
          model: Item,
          attributes: ['name', 'price'],
          as: 'item',
        },
      ],
      attributes: [
        'uuid',
        'status',
        'code',
        'descriptionBill',
        'createdAt',
        'quantity',
      ],
    });

    bills = bills.map((bill: any) => {
      bill = bill.dataValues
      if(bill.item) {
        bill.item = bill.item.dataValues
      }
      return bill
    })

    return bills;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
}

function formatBills(bills: any[]) {
  return bills.map((bill) => ({
    uuid: bill.uuid,
    code: bill.code,
    name: bill.item ? bill.item.name : bill.item,
    status: bill.status,
    descriptionBill: bill.descriptionBill,
    quantity: bill.quantity,
    item: bill.item,
    createdAt: bill.createdAt
  }));
}
