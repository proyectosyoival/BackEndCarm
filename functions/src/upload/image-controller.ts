import {Request, Response} from 'express'

export function getPhotos(req: Request, res: Response){
}

export function createPhoto(req: Request, res: Response){

    console.log('saving photos')
    console.log(req.body)

    return res.json({
        message: 'foto subida'
    })
}