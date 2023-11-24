const con = require('../data/banco');
const bcrypt = require('bcrypt');

module.exports = () => {

    const userModel = {};

    //Funcao para pegar tofos os usuarios
    userModel.getAllUsers = async () => {
        const res = await con.promise().query('SELECT * FROM `user`');
        return res[0];
    } 

    //Funcao para pegar usuario por ID
    userModel.getUserById = async (id) => {
        const res = await con.promise().query('SELECT * FROM `user` where id=?', [id]);
        return res[0];
    }

    //Função para pegar usuario atraves do seu username
    userModel.getUserByUsername = async (username) => {
        const res = await con.promise().query("SELECT * FROM `user` WHERE LOWER(username) LIKE ?", [username + '%']);
        return res[0];
    }

    //Funcao para deletar usuario por ID
    userModel.deleteUser = async (id) => {
        return await con.promise().query('DELETE FROM `user` where id=?', [id]);
    }

    //Funcao para criar novo usuario
    userModel.createNewUser = async (data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const sql = 'INSERT INTO `user`( `name`, `username`, `cpf`, `role`, `email`, `cellphone`, `password`) VALUES (?,?,?,?,?,?,?);';
        const values = [data.name, data.username, data.cpf, data.role, data.email, data.cellphone, hashedPassword];
        return await con.promise().query(sql, values);
    }

    //Funcao para atualizar novo usuario
    userModel.updateUser = async (id, data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const sql = 'UPDATE `user` SET name=?, username=?, cpf=?, role=?, email=?, cellphone=? , password=? WHERE id=?;';
        const values = [data.name, data.username, data.cpf, data.role, data.email, data.cellphone, hashedPassword, id];
        return await con.promise().query(sql, values)
    }

    //Funcão para atualizar o token
    userModel.updateTokenUser = async (token, id) => {
        const sql = 'UPDATE `user` SET token=? WHERE id=?;';
        const values = [token, id];
        return await con.promise().query(sql, values);
    }



    return userModel;

}


