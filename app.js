document.addEventListener('DOMContentLoaded', function(){
  
    const URL_DO_SUPABASE = 'https://zqnwarooewrabsxkemtt.supabase.co';
    const CHAVE_ANONIMA =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxbndhcm9vZXdyYWJzeGtlbXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMjkxNDcsImV4cCI6MjA2MTYwNTE0N30.62dffZaQtdL0ssJFnOMo1WXQLgtdETwiDeaePcQW1bY';
  
    const supabase = window.supabase.createClient(URL_DO_SUPABASE, CHAVE_ANONIMA)
  
    // -------------------
  
    function formatarData(textoData) {
      if (!textoData) return '-';
  
      const data = new Date(textoData);
  
      return data.toDateString('pt-BR') + ' ' + data.toTimeString('pt-BR');
    }
  
    function formatarPreco(preco) {
      return 'R$ ' + Number(preco).toFixed(2).replace('.', ',');
    }
  
    // ----------------------
  
     async function buscarEMostrarProdutos() {
      try {
        const {data, error} = await supabase
            .from('produtos')
            .select('*')
            .order('id');
  
        if (error) {
          throw new Error('Erro ao buscar produtos: ' + error.message);
        }
  
        document.getElementById('mensagemCarregando').style.display = 'none';
  
        if (!data || data.length === 0) {
          document.getElementById('mensagemErro').style.display = 'block';
          document.getElementById('mensagemErro').textContent = 'Nenhum produto encontrado na tabela.'
          return;
        }
  
        const corpoTabela = document.getElementById('corpoDaTabela');
  
        corpoTabela.innerHTML = '';
  
        data.forEach(produto => {
          const linha = document.createElement('tr');
  
          linha.innerHTML = `
          <td>${produto.id}</td>
          <td>${produto.nome || '-'}</td>
          <td>${produto.descricao || '-'}</td>
          <td>${formatarPreco(produto.preco)}</td>
          <td>${produto.estoque}</td>
          <td>${formatarData(produto.created_at)}</td>
          `;
  
          corpoTabela.appendChild(linha);
        });
  
        document.getElementById('tabelaProdutos').style.display = 'table';
      } catch (erro) {
        document.getElementById('mensagemCarregando').style.display = 'none';
  
        document.getElementById('mensagemErro').style.display = 'block';
        document.getElementById('mensagemErro').textContent = erro.message;
  
        console.log('Erro: ', erro);
      }
    }