async function serverData() {
  try {
    const response = await fetch('http://localhost:3000/doctors');
    if (!response.ok) {
      throw new Error('Médicos não encontrados');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.info('Inicie o servidor localmente!');
    return [];
  } finally {
    console.log('Busca concluída');
  }
}

export default serverData;