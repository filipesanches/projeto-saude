import classes from './Index.module.scss'

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes["welcome-container"]}>
      <h1 className={classes["welcome-title"]}>Bem-vindo ao Sistema de Saúde</h1>
      <p>No Sistema de Saúde, nossa missão é oferecer a você acesso fácil e conveniente aos melhores especialistas médicos. Sabemos que sua saúde é uma prioridade, e é por isso que estamos comprometidos em fornecer serviços de qualidade para atender às suas necessidades.</p>
      <p>Aqui, você encontrará uma ampla gama de especialistas altamente qualificados em diversas áreas da medicina, prontos para oferecer cuidados personalizados e soluções eficazes para suas preocupações de saúde.</p>
      <p>Além disso, valorizamos sua comodidade e conveniência. Nosso sistema foi projetado para tornar o agendamento de consultas simples e rápido, para que você possa receber o cuidado de que precisa, quando precisar.</p>
      <p>Junte-se a nós no Sistema de Saúde e tome o controle de sua saúde hoje mesmo. Estamos aqui para ajudá-lo em cada passo do caminho.</p>
    </div>
    </div>
  );
}