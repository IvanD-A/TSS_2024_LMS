import { Router } from "express";
import bcrypt from "bcryptjs";
import dbConnection from "../connection/db.js";
import { generateToken } from "../helpers/token.js";
import { getUserData } from "../helpers/getClassesByUserId.js";

const authRoutes = Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const { nombre_completo, id_rol, email, password } = req.body;

    if (
      nombre_completo === "" ||
      (id_rol < 0 && id_rol > 3) ||
      email === "" ||
      password === ""
    ) {
      res.status(400).send("complete all the fields and select a valid role!");
    }

    const encriptedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO usuario (nombre_completo,id_rol,email,PASSWORD) 
                             VALUES(?,?,?,?)`;

    const [rows] = await dbConnection.query(query, [
      nombre_completo,
      id_rol,
      email,
      encriptedPassword,
    ]);
    res.send("the user was created succesfully!!");
  } catch (e) {
    console.log(e);
    res.status(500).send("Something broke!");
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM  usuario WHERE email=?`;
    const response = await dbConnection.query(query, [email]);
    const rows = response[0];
    const fetchedEmail = rows[0].password;
    const validPassword = await bcrypt.compare(password, fetchedEmail);

    if (!validPassword) {
      res.send("incorrect password");
    } else {
      const userData = {
        id_usuario: rows[0].id,
        nombre_completo: rows[0].nombre_completo,
        id_rol: rows[0].id_rol,
        email: rows[0].email,};

        res.send({
          data: userData,
          token: generateToken(userData)});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something broke!");
  }
});

export default authRoutes;
