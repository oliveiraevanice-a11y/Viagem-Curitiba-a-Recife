// ==========================================
// 1. DADOS DA PLANILHA (Edite aqui com seus valores)
// ==========================================
const dadosPlanilha = {
  categorias: ['Transporte/Combustível', 'Hospedagem', 'Alimentação', 'Passeios', 'Emergências'],
  valoresCategorias: [1450, 1200, 850, 600, 300],

  dias: ['Dia 1 (Saída)', 'Dia 2 (SP/MG)', 'Dia 3 (BA)', 'Dia 4 (AL)', 'Dia 5 (Chegada Recife)'],
  gastoPlanejado: [600, 750, 800, 700, 950],
  gastoReal: [580, 820, 760, 690, 910],

  etapas: ['Curitiba (PR)', 'São Paulo (SP)', 'Belo Horizonte (MG)', 'Vitória da Conquista (BA)', 'Maceió (AL)', 'Recife (PE)'],
  kmAcumulado: [0, 415, 1000, 1950, 2860, 3120]
};

// Variáveis de estado para os botões de configuração
let mostrarLegenda = true;
let preencherArea = true;

// ==========================================
// 2. GRÁFICO 1: ROSCA (Proporção de Custos)
// ==========================================
const ctx1 = document.getElementById('graficoCategorias').getContext('2d');
const graficoCategorias = new Chart(ctx1, {
  type: 'doughnut', // Experimente trocar por 'pie' (pizza) ou 'polarArea'
  data: {
    labels: dadosPlanilha.categorias,
    datasets: [{
      label: 'Custo (R$)',
      data: dadosPlanilha.valoresCategorias,
      backgroundColor: ['#0284c7', '#0d9488', '#f59e0b', '#8b5cf6', '#ef4444'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: mostrarLegenda,
        position: 'bottom'
      }
    }
  }
});

// ==========================================
// 3. GRÁFICO 2: BARRAS AGRUPADAS (Comparação)
// ==========================================
const ctx2 = document.getElementById('graficoDiario').getContext('2d');
const graficoDiario = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: dadosPlanilha.dias,
    datasets: [
      {
        label: 'Planejado (R$)',
        data: dadosPlanilha.gastoPlanejado,
        backgroundColor: '#94a3b8',
        borderRadius: 6
      },
      {
        label: 'Realizado (R$)',
        data: dadosPlanilha.gastoReal,
        backgroundColor: '#0284c7',
        borderRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true // Garante que o eixo Y comece no zero
      }
    },
    plugins: {
      legend: {
        display: mostrarLegenda
      }
    }
  }
});

// ==========================================
// 4. GRÁFICO 3: LINHA/ÁREA (Evolução do Trajeto)
// ==========================================
const ctx3 = document.getElementById('graficoDistancia').getContext('2d');
const graficoDistancia = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: dadosPlanilha.etapas,
    datasets: [{
      label: 'Distância Percorrida (km)',
      data: dadosPlanilha.kmAcumulado,
      borderColor: '#0d9488',
      backgroundColor: 'rgba(13, 148, 136, 0.2)',
      borderWidth: 3,
      pointRadius: 5,
      tension: 0.3, // Deixa a linha levemente curvada (0 = reta)
      fill: preencherArea
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: mostrarLegenda
      }
    }
  }
});

// ==========================================
// 5. FUNÇÕES INTERATIVAS DE CONFIGURAÇÃO
// ==========================================
function alternarTipoGastos() {
  graficoDiario.config.type = graficoDiario.config.type === 'bar' ? 'line' : 'bar';
  graficoDiario.update();
}

function alternarLegenda() {
  mostrarLegenda = !mostrarLegenda;
  [graficoCategorias, graficoDiario, graficoDistancia].forEach(grafico => {
    grafico.options.plugins.legend.display = mostrarLegenda;
    grafico.update();
  });
}

function alternarPreenchimento() {
  preencherArea = !preencherArea;
  graficoDistancia.data.datasets[0].fill = preencherArea;
  graficoDistancia.update();
}
