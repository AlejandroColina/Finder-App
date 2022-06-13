import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDetail,
  getDeleteDetail,
  getOpiniones,
  getPreguntas,
  responderPregunta,
  getCarta,
  sendNoti,
} from "../Redux/actions/index";
import NavBar from "../NavBar/NavBar";
import s from "./Detail.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { PaypalCheckoutBtn } from "./PaypalCheckoutBtn";
import Swal from "sweetalert2";
import { ContactDetail } from "./ContactDetail/ContactDetail";
import gps from "../../assets/gps.png";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";
import Help from "../Help/Help";
import Comentar from "./Comentar/Comentar";
import Preguntar from "./Preguntar/Preguntar";
import { Mapa } from "./Mapa/Mapa";
import 'mapbox-gl/dist/mapbox-gl.css';
import ThreeDots from "./Loading";

export default function Detail({ Profesions }) {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(" ");
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector((state) => state.detail);
  const publi = useSelector((state) => state.info);
  const opiniones = useSelector((state) => state.opiniones);
  const preguntas = useSelector((state) => state.preguntas);
  console.log('PUBLI', publi)
  //paginado publicaciones similares
  const [page, setPage] = useState(0);
  const currentPage = publi.slice(page, page + 3);

  const handlePrev = (e) => {
    if (page > 0) setPage(page - 3);
  };
  const handleNext = (e) => {
    if (page < publi.length - 3) setPage(page + 3);
  };

  useEffect(() => {
    dispatch(getDetail(id));

    dispatch(getOpiniones(id));
    dispatch(getPreguntas(id));
    dispatch(getCarta(id));

    let { promedio } = MyDetail;

    return function () {
      dispatch(getDeleteDetail());
    };
  }, [id, dispatch]);

  let { promedio } = MyDetail;
  
  let precio = 10;
  if(promedio === 2) precio = 15
  if(promedio === 3) precio = 25
  if(promedio === 4) precio = 35
  if(promedio === 5) precio = 50
  let price = precio;

  const product = {
    description: "Comision",
    price: price,
  };

  const [order, setOrder] = useState(false);
  if (order) {
    console.log(order);
    Swal.fire({
      title: "Perfecto!",
      text: "Has accedido a los contactos del trabajador.¡Contáctalo!",
      icon: "success",
    });
  }

  const [input, setInput] = useState({
    respuesta: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const { longitud } = MyDetail



  const [comento, setComento] = useState(false);
  const [open, setOpen] = useState(false);

  if(!MyDetail.nombres){
    return(
      <>
      <NavBar />
      <Helmet>
          <title>Cargando..</title>
      </Helmet>
      <ThreeDots />
      </>
    )
  }

  return (
    <>     
        <Helmet>
          <title>{`${MyDetail.nombres}`} - Finder </title>
        </Helmet>
     
      <NavBar />

      <div className={s.container}>
        {/* tarjeta de contacto */}

        <div className={s.card}>
          <div className={s.nombres}>
            <span className={s.espacio}>Hola Soy</span>
            <strong>{MyDetail.nombres} </strong>!
          </div>
          <img className={s.img} src={MyDetail.imagen} alt={MyDetail.nombres} />
          <div className={s.ciudad}>
            <img src={gps} alt="ubicacion" className={s.gps} />
            {MyDetail.ciudad},{MyDetail.pais}
          </div>
          <br />

          {/* Botones  */}
          <div className={s.containerPrice}>
            <span className={s.valor}>Tarifa:</span>
            <span className={s.precio}>${MyDetail.precio}</span>
          </div>
          {open ? (
            <div>
              {!order ? (
                <div className={s.paypal}>
                  <PaypalCheckoutBtn product={product} setOrder={setOrder} />
                </div>
              ) : (
                <img
                  className={s.check}
                  src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                  alt=""
                />
              )}
              
            </div>
          ) : (
            // Contratar

            <div
              className={s.borderPrice}
              onClick={() => {
                setOpen(true);
              }}
            >
              <span className={s.contratar}>Contratar</span>
            </div>
          )}
          <br />


        </div>

        <div className={s.containerInfo}>
          {
            (!longitud) ? null : <Mapa MyDetail={MyDetail} />
          }

          <div className={s.titulos}>SERVICIO</div>
          <hr />
          <div className={s.subtitulos}>{MyDetail.Profesions}</div>

          <div className={s.titulos}>{MyDetail.titulo}</div>

          {MyDetail.multimedia ? MyDetail.multimedia.map((m, i) => <img key={i} src={m} alt={m} className={s.multimedia} />) : <img src={MyDetail.logoProfesion} alt={MyDetail.Profesions} className={s.multimedia} />}

          <div className={s.contenido}>{MyDetail.descripcion}</div>

          {!order ? <p></p> : <ContactDetail MyDetail={MyDetail} />}

          <br />
          <br />
          <br />
          <br />

          <div className={s.titulos}>Tenes dudas?</div>
          <hr />
           {isAuthenticated?
          <Preguntar user={[user.email,user.picture]} publicacion={id} profesional={[MyDetail.email,MyDetail.imagen]} /> : 
          <div className={s.width} ><button className={s.btndebe} onClick={() => { loginWithRedirect() }}>INGRESA o REGISTRATE para poder consultar</button></div>}
          <div className={s.commentsBox}>
            {preguntas
              ? preguntas.map((p) => (
                  <div key={p.id}>
                    <div className={s.containerComments}>
                      <div className={s.pregunta}>{p.pregunta}</div>
                      <>
                        {p.respuesta && (isAuthenticated && user.email === MyDetail.email) ? (
                          <>
                            <div className={s.respuesta}>
                              <div className={s.figura}></div>
                              {p.respuesta}
                            </div>{" "}
                          </>
                        ) : (
                          <form
                            className={s.form}
                            onSubmit={(e) => {
                              e.preventDefault();
                              dispatch(responderPregunta(p.id, input));
                              dispatch(sendNoti(p.user[0],input));
                              Swal.fire({
                                text: "Tu respuesta fue enviada!",
                                icon: "succes",
                              });
                            }}
                          >
                            <textarea
                              className={s.input}
                              name="respuesta"
                              rows="6"
                              type="text"
                              onChange={(e) => handleChange(e)}
                              value={input.respuesta}
                              required
                            />
                            <input
                              type="submit"
                              value="responder"
                              className={s.btn}
                            />
                          </form>
                        )}
                      </>
                    </div>
                  </div>
              ))
              : null}
          </div>
          <br />
          <br />
          <div className={s.titulos}>
            RESEÑAS
            <Box sx={{ "& > legend": { mt: 2 } }}>
              {MyDetail.promedio ? (
                <Rating size="large" value={MyDetail.promedio} readOnly />
              ) : (
                <Rating size="large" name="no-value" value={null} />
              )}
            </Box>{" "}
          </div>
          <hr />
          {order && !comento ? (
            <Comentar
              publicacion={id}
              setComento={setComento}
              profesional={[MyDetail.email,MyDetail.imagen]}
            />
          ) : null}
          <div className={s.commentsBox}>
            {opiniones
              ? opiniones.map((r) => (
                <div className={s.containerComments} key={r.id}>
                  <div className={s.commentPersona}>
                    "{r.comentario}"
                    <Rating size="25px" value={r.puntaje} readOnly />
                  </div>
                </div>
              ))
              : null}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className={s.titulos}>Publicaciones similares</div>
          <hr />
          <br />
          <br />
          <div className={s.cardsContainer}>
            {publi && publi[0] ? (
              currentPage.map((el) => (
                <Link to={`/trabajo/${el.id}`} className={s.link}>
                  <Card className={s.cardUi} sx={{ maxWidth: 345 }} key={el.id}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          el.Publicacions[0].multimedia
                            ? el.Publicacions[0].multimedia
                            : el.imagen
                        }
                        alt="emprendedor"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {el.Publicacions[0].titulo}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          ${el.Publicacions[0].precio}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {el.Publicacions[0].descripcion}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              ))
            ) : (
              <p>NO SE ENCONTRARON</p>
            )}
            <div className={s.paginate}>
              {page > 0 ? (
                <button className={s.btnPaginate} onClick={handlePrev}>
                  ANTERIOR
                </button>
              ) : null}
              {page < publi.length - 1 ? (
                <button className={s.btnPaginate} onClick={handleNext}>
                  SIGUIENTE
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Help />
    </>
  );
}