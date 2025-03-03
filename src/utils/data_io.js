const data_io = new (function () {
  // TODO: canviar per la URL del servidor
  this.trigger_url = "http://localhost:8000/trigger.data_io.php";

  this.guardar_respuesta = async function (
    pregunta,
    respuesta_numero,
    game_id
  ) {
    const request_data = new URLSearchParams();
    request_data.append("mode", "guardar_respuesta");
    request_data.append("current_data[pregunta]", pregunta);
    request_data.append("current_data[respuesta_numero]", respuesta_numero);
    request_data.append("game_id", game_id);

    try {
      const response = await fetch(data_io.trigger_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: request_data.toString(),
      });
      return response;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  this.obtener_respuesta = async function (pregunta, game_id) {
    const request_data = new URLSearchParams();
    request_data.append("mode", "obtener_respuesta");
    request_data.append("pregunta", pregunta);
    request_data.append("game_id", game_id);

    try {
      const response = await fetch(data_io.trigger_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: request_data.toString(),
      });
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
})();

export default data_io;
