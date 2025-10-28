// ===== WiFi Points Data =====
const WIFI_POINTS = [
    [54.732598, 55.945472], [54.713031, 55.953204], [54.718659, 55.954729], 
    [54.720758, 55.928454], [54.719304, 55.944400], [54.740612, 55.949871], 
    [54.740870, 55.950230], [54.805637, 56.035764], [54.805637, 56.035764], 
    [54.805637, 56.035764], [54.806029, 56.036718], [54.805637, 56.035764], 
    [54.703215, 55.830441], [54.775491, 56.022061], [54.736447, 55.972770], 
    [54.737843, 55.971441], [54.772961, 56.059353], [54.773139, 56.059466], 
    [54.773003, 56.059559], [54.773407, 56.062602], [54.773407, 56.062602], 
    [54.772096, 56.058560], [54.716733, 55.924017], [54.714391, 55.935595], 
    [54.716133, 55.927183], [54.714391, 55.935595], [54.714733, 55.934750], 
    [54.714391, 55.935595], [54.716600, 55.925883], [54.714391, 55.935595], 
    [54.714391, 55.935595], [54.714391, 55.935595], [54.714391, 55.935595], 
    [54.715467, 55.928400], [54.714391, 55.935595], [54.714760, 55.933120], 
    [54.717267, 55.922733], [54.714391, 55.935595], [54.714867, 55.931567], 
    [54.714391, 55.935595], [54.714391, 55.935595], [54.714391, 55.935595], 
    [54.778305, 56.130179], [54.721999, 56.013399], [54.697771, 55.987626], 
    [54.777666, 56.078769], [54.768214, 56.081841], [54.751741, 55.996402], 
    [54.774156, 56.072337], [54.777355, 56.124978], [54.764381, 56.067208], 
    [54.774774, 56.127655], [54.719368, 55.989485], [54.763794, 56.048056], 
    [54.771175, 56.068375], [54.753259, 55.990447], [54.769347, 56.073954], 
    [54.763586, 56.059859], [54.711879, 55.998621], [54.774592, 56.067702], 
    [54.693681, 55.991183], [54.768999, 56.070819], [54.768214, 56.081841], 
    [54.776051, 56.077772], [54.723054, 55.992019], [54.705044, 55.983556], 
    [54.777298, 56.130386], [54.777355, 56.124978], [54.782838, 56.137986], 
    [54.778918, 56.130494], [54.780891, 56.114719], [54.747361, 56.022831], 
    [54.702916, 55.996025], [54.763332, 56.068492], [54.771834, 56.076586], 
    [54.760709, 56.050786], [54.767763, 56.061324], [54.77641, 56.075158], 
    [54.761, 56.067621], [54.770728, 56.077547], [54.767461, 56.049924], 
    [54.773958, 56.083871], [54.778429, 56.074161], [54.774364, 56.079002], 
    [54.719331, 56.009105], [54.823885, 56.079973], [54.707156, 56.006257], 
    [54.704872, 56.006868], [54.707957, 56.00331], [54.726003, 56.006904], 
    [54.766236, 56.016516], [54.750224, 56.005179], [54.696017, 56.005242], 
    [54.698577, 56.00623], [54.699847, 55.994453], [54.703821, 55.998352], 
    [54.764049, 56.056068], [54.703114, 55.992576], [54.721999, 56.013399], 
    [54.710693, 55.995172], [54.776944, 56.120999], [54.701335, 55.996681], 
    [54.766848, 56.064477], [54.768827, 56.053814], [54.76595, 56.077457], 
    [54.773252, 56.069301], [54.705533, 56.007407], [54.674606, 55.917857], 
    [54.674606, 55.917857], [54.674606, 55.917857], [54.705242, 55.825098], 
    [54.725348, 55.997098], [54.725348, 55.997098], [54.725348, 55.997098], 
    [54.725348, 55.997098], [54.675507, 55.918516], [54.771538, 56.081868], 
    [54.757269, 56.000103], [54.735315, 55.98146], [54.741416, 56.026918], 
    [54.564866, 55.884307], [54.569852, 55.901747], [54.714588, 55.963371], 
    [54.717444, 55.954065], [54.815218, 56.067297], [54.712149, 56.006203], 
    [54.70224, 55.832613], [54.788564, 56.131141], [54.787671, 56.123532], 
    [54.785169, 56.040366], [54.820955, 56.107138], [54.780288, 56.021025], 
    [54.735163, 55.967836], [54.726158, 55.949187], [54.738604, 55.997651], 
    [54.817578, 56.087042], [54.733047, 55.962015], [54.70816, 55.994552], 
    [54.729985, 55.946681], [54.758168, 56.011404], [54.711156, 56.002017], 
    [54.731482, 55.938982], [54.73117, 55.937958], [54.708305, 56.007245], 
    [54.721052, 55.928795], [54.711385, 55.993851], [54.712846, 55.826845], 
    [54.752001, 56.02878], [54.72293, 55.946267], [54.761638, 56.022265], 
    [54.724921, 55.924892], [54.814362, 56.087402], [54.780288, 56.021025], 
    [54.710215, 55.994309], [54.740667, 55.96868], [54.742554, 55.959239], 
    [54.815218, 56.067297], [54.71863, 55.959159], [54.733026, 55.951172], 
    [54.745906, 55.993204], [54.716871, 56.00976], [54.7186, 55.9406], 
    [54.813858, 56.073047], [54.721349, 55.952511], [54.781218, 56.030422], 
    [54.770162, 56.059599], [54.670259, 55.912518], [54.711582, 55.8382], 
    [54.724931, 55.942297], [54.777412, 56.031557], [54.776315, 56.031276], 
    [54.74076, 55.967517], [54.724931, 55.942297], [54.767879, 56.015935], 
    [54.672195, 55.918114], [54.70389, 55.842912], [54.766734, 56.05287], 
    [54.791755, 56.140616], [54.76394, 56.011575], [54.716642, 56.00745], 
    [54.733317, 55.934086], [54.753233, 56.011582], [54.704113, 55.836341], 
    [54.697631, 55.982095], [54.722930, 55.946267], [54.734513, 55.956347], 
    [54.733832, 55.959841], [54.733832, 55.959841], [54.735719, 55.959473], 
    [54.738058, 55.956329], [54.736944, 55.959280], [54.738942, 55.960173], 
    [54.740501, 55.959293], [54.751237, 55.986135], [54.758924, 55.994829], 
    [54.766100, 56.019893], [54.779598, 56.114567], [54.779598, 56.114567], 
    [54.781311, 56.126245], [54.821484, 56.058790], [54.822246, 56.059770], 
    [54.818942, 56.071906], [54.817697, 56.072831], [54.804394, 56.116651], 
    [54.804394, 56.116651], [54.738838, 55.955143], [54.622777, 56.110144], 
    [54.761231, 55.994685], [54.697635, 55.852914], [54.687572, 55.996959]
];

// ===== Configuration =====
const UFA_CENTER = [54.7431, 55.9578]; // Центр Уфы
const DEFAULT_ZOOM = 12;
const MAX_ZOOM = 18;
const MIN_ZOOM = 10;

// ===== Local Storage Keys =====
const STORAGE_KEYS = {
    WIFI_DATA: 'freenet_wifi_data',
    LAST_UPDATE: 'freenet_last_update',
    USER_LOCATION: 'freenet_user_location',
    MAP_STATE: 'freenet_map_state'
};

// ===== Global Variables =====
let map = null;
let markers = [];
let userMarker = null;
let userLocation = null;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    loadWiFiData();
    setupEventListeners();
    updateStats();
});

// ===== Initialize Map =====
function initializeMap() {
    // Создаем карту
    map = L.map('map', {
        center: UFA_CENTER,
        zoom: DEFAULT_ZOOM,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        zoomControl: false
    });

    // Добавляем слой тайлов OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: MAX_ZOOM
    }).addTo(map);

    // Добавляем кастомный контроль зума
    L.control.zoom({
        position: 'topleft'
    }).addTo(map);

    // Восстанавливаем последнее состояние карты
    restoreMapState();

    // Сохраняем состояние при изменении
    map.on('moveend', saveMapState);
    map.on('zoomend', saveMapState);

    console.log('Карта инициализирована');
}

// ===== Load WiFi Data =====
function loadWiFiData() {
    try {
        // Сохраняем данные в localStorage для офлайн доступа
        localStorage.setItem(STORAGE_KEYS.WIFI_DATA, JSON.stringify(WIFI_POINTS));
        localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, new Date().toISOString());

        // Загружаем данные из localStorage (работает офлайн)
        const savedData = localStorage.getItem(STORAGE_KEYS.WIFI_DATA);
        const wifiData = savedData ? JSON.parse(savedData) : WIFI_POINTS;

        // Создаем маркеры
        createMarkers(wifiData);

        // Показываем уведомление
        showStatus('Данные загружены', 'success');
        
        console.log(`Загружено ${wifiData.length} WiFi точек`);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showStatus('Ошибка загрузки данных', 'error');
    }
}

// ===== Create Markers =====
function createMarkers(points) {
    // Удаляем старые маркеры
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Создаем пользовательскую иконку
    const wifiIcon = L.divIcon({
        className: 'wifi-marker-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });

    // Создаем маркеры для каждой точки
    points.forEach((point, index) => {
        const [lat, lng] = point;
        
        const marker = L.marker([lat, lng], {
            icon: wifiIcon,
            title: `WiFi точка #${index + 1}`
        });

        // Добавляем попап
        const popupContent = createPopupContent(lat, lng, index + 1);
        marker.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'wifi-popup-custom'
        });

        marker.addTo(map);
        markers.push(marker);
    });

    updateStats();
}

// ===== Create Popup Content =====
function createPopupContent(lat, lng, number) {
    const distance = userLocation 
        ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng).toFixed(2)
        : '—';

    return `
        <div class="wifi-popup">
            <div class="wifi-popup-header">
                <div class="wifi-popup-icon">📡</div>
                <div>
                    <div class="wifi-popup-title">WiFi точка #${number}</div>
                </div>
            </div>
            <div class="wifi-popup-location">
                ${distance !== '—' ? `Расстояние: ${distance} км` : 'Определите ваше местоположение'}
            </div>
            <div class="wifi-popup-actions">
                <button class="popup-button primary" onclick="navigateTo(${lat}, ${lng})">
                    Маршрут
                </button>
                <button class="popup-button secondary" onclick="copyCoordinates(${lat}, ${lng})">
                    Копировать
                </button>
            </div>
        </div>
    `;
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Центрировать на местоположении пользователя
    document.getElementById('centerButton').addEventListener('click', centerOnUser);

    // Обновить данные
    document.getElementById('refreshButton').addEventListener('click', refreshData);

    // Найти ближайшую точку
    document.getElementById('nearestButton').addEventListener('click', findNearest);
}

// ===== Center on User Location =====
function centerOnUser() {
    if (navigator.geolocation) {
        showStatus('Определение местоположения...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Сохраняем в localStorage
                localStorage.setItem(STORAGE_KEYS.USER_LOCATION, JSON.stringify(userLocation));

                // Центрируем карту
                map.setView([userLocation.lat, userLocation.lng], 15);

                // Добавляем/обновляем маркер пользователя
                if (userMarker) {
                    userMarker.setLatLng([userLocation.lat, userLocation.lng]);
                } else {
                    const userIcon = L.divIcon({
                        className: 'user-marker-icon',
                        html: '<div style="width:20px;height:20px;background:#007AFF;border:4px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    });

                    userMarker = L.marker([userLocation.lat, userLocation.lng], {
                        icon: userIcon,
                        zIndexOffset: 1000
                    }).addTo(map);
                }

                showStatus('Местоположение определено', 'success');
            },
            (error) => {
                console.error('Ошибка геолокации:', error);
                showStatus('Не удалось определить местоположение', 'error');
            }
        );
    } else {
        showStatus('Геолокация не поддерживается', 'error');
    }
}

// ===== Refresh Data =====
function refreshData() {
    showStatus('Обновление данных...', 'info');
    
    // Имитация обновления (в реальности здесь был бы API запрос)
    setTimeout(() => {
        loadWiFiData();
        showStatus('Данные обновлены', 'success');
    }, 500);
}

// ===== Find Nearest WiFi Point =====
function findNearest() {
    if (!userLocation) {
        showStatus('Сначала определите местоположение', 'error');
        centerOnUser();
        return;
    }

    let nearest = null;
    let minDistance = Infinity;

    WIFI_POINTS.forEach((point, index) => {
        const [lat, lng] = point;
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { lat, lng, index, distance };
        }
    });

    if (nearest) {
        map.setView([nearest.lat, nearest.lng], 16);
        markers[nearest.index].openPopup();
        showStatus(`Ближайшая точка: ${minDistance.toFixed(2)} км`, 'success');
    }
}

// ===== Calculate Distance (Haversine Formula) =====
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// ===== Navigate To Point =====
function navigateTo(lat, lng) {
    const url = `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`;
    window.open(url, '_blank');
}

// ===== Copy Coordinates =====
function copyCoordinates(lat, lng) {
    const coords = `${lat}, ${lng}`;
    navigator.clipboard.writeText(coords).then(() => {
        showStatus('Координаты скопированы', 'success');
    }).catch(() => {
        showStatus('Ошибка копирования', 'error');
    });
}

// ===== Update Statistics =====
function updateStats() {
    const count = WIFI_POINTS.length;
    document.getElementById('wifiCount').textContent = count;
}

// ===== Show Status Message =====
function showStatus(message, type = 'success') {
    const statusBar = document.getElementById('statusBar');
    const statusText = statusBar.querySelector('.status-text');
    const statusIcon = statusBar.querySelector('.status-icon');
    
    statusText.textContent = message;
    
    // Устанавливаем иконку в зависимости от типа
    if (type === 'success') {
        statusIcon.textContent = '✓';
        statusBar.classList.remove('error');
    } else if (type === 'error') {
        statusIcon.textContent = '⚠';
        statusBar.classList.add('error');
    } else {
        statusIcon.textContent = '⟳';
        statusBar.classList.remove('error');
    }
    
    // Показываем статус
    statusBar.classList.add('show');
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        statusBar.classList.remove('show');
    }, 3000);
}

// ===== Save Map State =====
function saveMapState() {
    const state = {
        center: map.getCenter(),
        zoom: map.getZoom()
    };
    localStorage.setItem(STORAGE_KEYS.MAP_STATE, JSON.stringify(state));
}

// ===== Restore Map State =====
function restoreMapState() {
    const savedState = localStorage.getItem(STORAGE_KEYS.MAP_STATE);
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            map.setView([state.center.lat, state.center.lng], state.zoom);
        } catch (error) {
            console.error('Ошибка восстановления состояния карты:', error);
        }
    }
}

// ===== Check if data is fresh =====
function isDataFresh() {
    const lastUpdate = localStorage.getItem(STORAGE_KEYS.LAST_UPDATE);
    if (!lastUpdate) return false;
    
    const hoursSinceUpdate = (Date.now() - new Date(lastUpdate)) / (1000 * 60 * 60);
    return hoursSinceUpdate < 24; // Данные свежие, если обновлялись менее 24 часов назад
}

console.log('FreeNet Map загружен');