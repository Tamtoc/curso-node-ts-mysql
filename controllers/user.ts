import { Request, Response } from "express";
import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {

    const users = await User.findAll();

    res.json( {users} );

}

export const getUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( user ) {

        res.json( user );

    } else {
        res.status(404).json({
            msg: 'Does not exist user with id ' + id
        });
    }

}

export const postUser = async ( req: Request, res: Response ) => {

    const { body } = req;

    if ( !body.name || !body.email ) {
        return res.status(400).json({
            msg: 'incorrect data'
        });
    }

    try {

        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if ( emailExists ) {
            return res.status(400).json({
                msg: 'Already exists the email'
            });
        }

        const user = await User.create(body);

        res.json( user );
        
    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'talk to the administrator'
        });

    }

}

export const putUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'Does not exist user with the id ' + id
            });
        }

        await user.update( body );

        res.json( user );
        
    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'talk to the administrator'
        });

    }

}

export const deleteUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: 'Does not exist user with the id ' + id
        });
    }

    // Eliminación física
    // await user.destroy();

    // Eliminación lógica
    await user.update({
        state: false
    });

    res.json( user );

}


