document.getElementById('news-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const newsListElement = document.getElementById('news-list');

    // SweetAlert2를 사용해 로딩 화면 표시
    Swal.fire({
        title: '로딩 중...',
        text: '보안 뉴스 데이터를 가져오는 중입니다.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // NewsAPI를 사용하여 보안 뉴스 가져오기
    const apiKey = 'YOUR_API_KEY';  // 뉴스 API 키를 넣으세요
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            Swal.close();  // 로딩 화면 닫기

            if (data.articles.length === 0) {
                Swal.fire({
                    title: '결과 없음',
                    text: '선택한 카테고리에 해당하는 뉴스가 없습니다.',
                    icon: 'info',
                    confirmButtonText: '확인'
                });
                return;
            }

            displayNews(data.articles, newsListElement);
        })
        .catch(error => {
            Swal.close();
            Swal.fire({
                title: '오류 발생',
                text: '뉴스 데이터를 가져오는 데 오류가 발생했습니다.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        });
});

function displayNews(articles, container) {
    container.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'mb-4', 'p-4');

        articleElement.innerHTML = `
            <h3 class="font-semibold text-xl text-blue-600">${article.title}</h3>
            <p class="text-sm text-gray-500">출처: ${article.source.name}</p>
            <p class="mt-2 text-gray-700">${article.description}</p>
            <a href="${article.url}" target="_blank" class="mt-3 text-blue-500 hover:underline">자세히 보기</a>
        `;

        container.appendChild(articleElement);
    });
}
