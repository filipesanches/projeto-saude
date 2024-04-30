async function serverData() {
  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) {
      throw new Error('Médicos não encontrados');
    }
    const data = await response.json();

    // Verifica se há CPFs armazenados no local storage
    const storedCpfsJSON = localStorage.getItem('delete');
    let storedCpfs = [];
    if (storedCpfsJSON) {
      storedCpfs = JSON.parse(storedCpfsJSON);
    }

    // Filtra os dados para excluir médicos com CPFs iguais aos armazenados
    const filteredData = data.filter(doctor => !storedCpfs.includes(doctor.cpf));

    return filteredData;
  } catch (error) {
    console.info('Inicie o servidor localmente!');
    return [];
  } finally {
    console.log('Busca concluída');
  }
}

export default serverData;
