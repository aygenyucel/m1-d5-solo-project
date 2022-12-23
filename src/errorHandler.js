export const notFoundErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({
      message: err.message,
    });
  } else {
    next(err);
  }
};

export const badRequestErrorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res
      .status(400)
      .send({ message: err.message, list: err.errorsList.map((e) => e.msg) });
  } else {
    next(err);
  }
};
export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: err.message });
  } else {
    next(err);
  }
};

export const genericErrorHandler = (err, req, res, next) => {
  console.log("ERROR RECEIVED FROM UP ABOVE:", err);
  res
    .status(500)
    .send({ message: "An error occures on our side! we gonna fix that asap" });
};
