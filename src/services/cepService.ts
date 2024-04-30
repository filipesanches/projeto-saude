const consultCEP = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error('Erro ao consultar o CEP');
    }
    return data;
  } catch (error) {
    throw new Error('CEP não encontrado');
  }
};

export default consultCEP;
