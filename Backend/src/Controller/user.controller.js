//User driver

'use strict'

const User =  require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//------------------------------Create user-------------------------------

const createUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        if(!email){
        return res.status(404).json({
            msg: "Debes ingresar un email valido"
        })
    }

        if(!password){
            return res.status(404).json({
                msg: "Debes ingresar una contraseña valido"
            })
        }

        const usuario = new User(req.body)
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        const usuarios = await usuario.save()

        if(!usuarios){
            return 'No se logro crear el usuario'
        }

        return res.status(404).json({
            msg: `El usuario se creo de forma exitosa: `,
            usuario: usuarios
        })

        }catch(err){
            console.log(err)
    }
}

//----------------------------------------------User-List---------------------------------

const readUser = async(req, res) => {
    try{

        const users = await User.find();

        if(!users){
            return res.status(404).json({
                msg: "No se encontro la lista de usuarios"
            });
        }else{
            return res.status(404).json({
                msg: "La lista de usuarios es la siguiente: ",
                lista_usuario: users
            })
        }

    }catch(err){
        console.log(err)
    }
}

//---------------------------------------------user-edit---------------------------------------

const updateUser = async(req, res) => {
    try{
        const updateData = req.body

        if(!updateData.id){
            return res.status(404).json({
                msg: `El ID del usaurio no es correcto`
            })
        }

        const updateUser = await User.findByIdAndUpdate(updateData.id, updateData, {new: true});

        if(!updateUser){
            return res.status(404).json({
                msg: 'Usuaro no encontrado'
            })
        }
        
        res.status(404).json(updateUser)

    }catch(err){
        console.log(err)
    }
}

//---------------------------------------------delete-user--------------------------------------0

const deleteUser = async(req, res) => {
    try{
        const id = req.body.id
        
        let userDelete = await User.findByIdAndDelete({_id: id})

        if(!userDelete){
            return res.status(404).json({
                msg: "No se encontro usuario"
        })
        }else{
            return res.status(404).json({
                msg: "Usuario eliminado: ",
                usuario_eliminado:userDelete
            })
        }

    }catch(err){
        console.log(err)
    }
}

//----------------------------------------------login (administrador - usuario)-----------------------

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                error: 'Correo invalido'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(404).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign({userId: user._id}, 'mi_secreto', {expiresIn: '10h'});
        
        user.token = token
        await user.save();

        res.json({
            msg: 'Usuario autenticado exitosamente',
            token
        });

    }catch(err){
        console.log(err)
    }
}

//---------------------------------------------------List by user---------------------------------------------------------

const viewDataUser = async(req, res) => {
    
    try{

        const token = req.headers['token']

        if(!token){
            return res.status(404).json({
                msg: 'Acceso no autorizado'
            });
        }

        const user = await User.findOne({token});

        if(!user){
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }else{
            return res.status(404).json({
                msg: 'Los datos del usuario son:',
                usuario: user
            })
        }

    }catch(err){
        console.log(err)
    }

}


module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    login,
    viewDataUser
}


























