const userModel = require('../models/userModel');

module.exports = app => {

    const userController = {};
    const userModel = app.models.userModel;

    //Controlador para busca de todos os usuarios
    userController.getAllUsers = async (req, res) => {

        try{
            const users =  await userModel.getAllUsers()
            res.status(200).json({
                message: `${users.length} usuário(s).`,
                success: true,
                status: 200,
                data: users
            })    

        }catch (err){
            res.status(500).json({
                message: 'Algo deu errado ao buscar os usuarios.',
                success: false,
                status: 500,
                error: err.message
            });
        }
    };

    //Controlador de busca de usuario por ID
    userController.getUserById = async (req, res) => {

        const {
            userId,
        } = req.params;

        try{
            const user =  await userModel.getUserById(userId)

            if (user.length > 0 ){
                res.status(200).json({
                    message: `${user.length} usuario encontrado. `,
                    success: true,
                    status: 200,
                    data: user
                })    
            }else{
                res.status(404).json({
                    message: 'Nenhum cadastro encontrado com esse ID.',
                    success: true,
                    status: 404
                });
            }

        }catch (err){
            res.status(500).json({
                message: 'Algo deu errado ao buscar os usuarios.',
                success: false,
                status: 500,
                error: err.message
            });
        }
    };

    //Controlador de busca de usuario por username
    userController.getUserByUsername = async (req, res) => {

        const {
            username,
        } = req.params;

        try{

            const user = await userModel.getUserByUsername (username.toLowerCase());

            if(user.length > 0){
                res.status(200).json({
                    message: `${user.length} usuários encontrados.`,
                    success: true,
                    status: 200,
                    data: user
                });
            }else{
                res.status(404).json({
                    message: `Nenhum cadastro encontrado com ${username}.`,
                    success: true,
                    status: 404
                });
            }

        }catch(err){
            console.error("Error de busca por username: " + err)
            res.status(500).json({
                message: "Error no servidor ao buscar um usuario pelo username.",
                success: false,
                status: 500,
                error: err.message
            });
        }
    }

    //Controlador para deletar usuario
    userController.deleteUser = async (req, res) =>{

        const {
            userId,
        } = req.params;

        try{

            const userExist =  await userModel.getUserById(userId)
            
            if(userExist.length > 0 ){
           
                await userModel.deleteUser(userId)
        
                res.status(200).json({
                    message: `${userExist[0].name} usuario deletado com sucesso. `,
                    success: true,
                    status: 200
                })    
            
            }else{
                res.status(404).json({
                    message: 'Nenhum cadastro encontrado com esse ID de User para deletar.',
                    success: true,
                    status: 404
                });
            }
           

        }catch(err){
           
            res.status(500).json({
                message: 'Algo deu errado ao deletar usuario.',
                success: false,
                status: 500,
                error:  err.message
            });
        }

    }

    //Controlador para criar novo usuario
    userController.createNewUser = async (req, res) => {
        try{

            await userModel.createNewUser(req.body);
            res.status(201).json({
                message: `O usuario ${req.body.name} foi criado com sucesso.`,
                success: true,
                status: 201
            })  

            //TASK CreateUser Lógica para verificar se os campos que são unique já existem e retornar um error dizendo que já existe um cadastro com esse mesmo dado.

        }catch(err){
            console.error("Error ao criar usuario: " + err)
            res.status(500).json({
                message: 'Algo deu errado ao cadastrar o usuario.',
                success: false,
                status: 500,
                error: err.message
            });
        }
    }

    //Controlador para atualizar usuario
    userController.updateUser = async(req, res) => {

        const {
            userId,
        } = req.params;

        try{

            const userExist =  await userModel.getUserById(userId)
            
            if(userExist.length > 0 ){

                await userModel.updateUser(userId, req.body)

                res.status(200).json({
                    message: "Usuario atualizado com sucesso!",
                    success: true,
                    status: 200,
                })

                //#TASK UpdateUser  Lógica para verificar se os campos que são unique já existem e retornar um error dizendo que já existe um cadastro com esse mesmo dado.

            }else{
                res.status(404).json({
                    message: 'Nenhum cadastro encontrado com esse ID para atualizar.',
                    success: true,
                    status: 404
                });
            }


        }catch(err){
            res.status(500).json({
                message: "Ocorreu um error ao tentar atualizar o user.",
                success: false,
                status: 500,
                error: err.message
            })
        }
    }



    return userController;
}