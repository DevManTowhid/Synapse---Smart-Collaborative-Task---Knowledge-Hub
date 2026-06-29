import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createTask = async (req: Request, res: Response): Promise<void> => {

try{
    
const {title, description, workspaceId} = req.body;

const userId = (req as any).userid;

const workspace = await prisma.workspace.findFirst({where : {id : workspaceId, ownerId : userId}});

if(!workspace) {
    res.status(404).json({error : 'Workspace not found or not authorized'});
    return;
}


const task = await prisma.task.create({
    data : {title, description, workspaceId}
});


res.status(200).json({
message : "Task Added Successfully!",
task
});

}
catch(error)
{
    console.error('Task Creation Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
}

};