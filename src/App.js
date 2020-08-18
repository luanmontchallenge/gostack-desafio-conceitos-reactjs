import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);


  async function loaderRepository() {
    const { data } = await api.get('repositories');
    console.log(data);

    setRepository(data);
  }

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: "New Repo",
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: [
        "React",
        "NodeJS",
        "React Native"
      ]
    });

    const repository = data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repositories.filter(repo => repo.id !== id)
    setRepository(repoIndex)

  }

  useEffect(() => {
    loaderRepository();
  }, []);


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
