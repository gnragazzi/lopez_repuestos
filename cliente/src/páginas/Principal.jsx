function Principal() {
  const objeto1={
    a:123,
    b:345
  }
  console.log(objeto1)
  return (
    <div>
      <h1 className="prueba">Principal</h1>
      {/*<button
        onClick={() => {
          setAuth("");
          axios
            .get("http://localhost:8080/clear")
            .then((res) => console.log(res));
        }}
      >
        logout
      </button>*/}
    </div>
  );
}

export default Principal;
