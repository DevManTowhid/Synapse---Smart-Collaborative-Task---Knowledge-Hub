import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const createWorkspace = async (req: Request, res: Response): Promise<void> => {


try{
    const {name} = req.body;

const userId = (req as any).userid;

const workspace = await prisma.workspace.create({
    data : {name, ownerId : userId}
});

res.status(201).json({
message : "Workspace Created Successfully!",
workspace
});




}catch(error){
    res.status(500).json({
        error : 'Internal Server Error'
    
    });
};














};