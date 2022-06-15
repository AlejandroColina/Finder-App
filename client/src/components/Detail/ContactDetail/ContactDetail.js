import React from "react";
import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

export const ContactDetail = ({ MyDetail }) => {
  const { telefono, email, documento } = MyDetail;
  console.log(MyDetail);

  return (
    <Container>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: "white",
          display: "flex",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              gutterBottom
              variant="h5"
              component="div"
            >
              <b>Datos de contacto</b>
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              <b>Telefono:</b> {telefono}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              <b>Email:</b> {email}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              <b>Documento:</b> {documento}
            </Typography>
            <a
              href="https://wa.me/3535082917?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
              className={styles.whatsapp}
              target="_blank"
            >
              <img
                className={styles.icon}
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt=""
              />
            </a>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
