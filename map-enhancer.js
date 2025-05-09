// 地图增强脚本 - 为所有地图标记添加高德地图跳转功能和美化图标

document.addEventListener('DOMContentLoaded', function() {
    // 地理坐标数据库
    const locationCoordinates = {
        // 广州
        '陈家祠': '113.253349,23.130042',
        '上下九步行街': '113.245862,23.12298',
        '北京路步行街': '113.280751,23.123474',
        '广州博物馆': '113.258501,23.124701',
        '莲香楼': '113.267279,23.125127',
        '泮溪酒家': '113.270186,23.128995',
        '广州酒家': '113.269941,23.119395',
        // 中山
        '孙中山故居': '113.419602,22.466564',
        '孙中山纪念堂': '113.287306,23.135956',
        '翠亨村': '113.418872,22.464925',
        '翠亨邨餐厅': '113.419602,22.466564',
        '南苑酒家': '113.419987,22.467312',
        // 深圳
        '深圳世界之窗': '113.979471,22.536728',
        '欢乐谷': '114.058727,22.544511',
        '华强北': '114.093376,22.548414',
        '海上世界': '113.921485,22.479845',
        '世界之窗美食广场': '113.979471,22.536728',
        '深圳湾海鲜餐厅': '113.939456,22.505329',
        // 香港
        '维多利亚港': '114.17134,22.293496',
        '尖沙咀海滨长廊': '114.170953,22.2935',
        '星光大道': '114.172826,22.293158',
        '旺角购物区': '114.170141,22.319023',
        '太平山顶': '114.15004,22.271383',
        '凌霄阁摩天台': '114.150085,22.271437',
        '中环': '114.15803,22.281874',
        '兰桂坊': '114.154988,22.280785',
        '添好运点心': '114.169498,22.297437',
        '鏞记酒家': '114.158481,22.284688',
        '澳洲牛奶公司': '114.152672,22.280977',
        '太平山顶餐厅': '114.149835,22.271283',
        '兰桂坊美食': '114.154988,22.280785',
        // 交通
        '中山站': '113.399449,22.51997',
        '深圳北站': '114.058414,22.60989',
        '福田口岸': '114.071892,22.522657',
        '山顶缆车站': '114.156187,22.278349'
    };

    // 为地图标记添加SVG图标和高德地图链接功能
    function enhanceMapMarkers() {
        const mapMarkers = document.querySelectorAll('.map-marker');
        
        mapMarkers.forEach(marker => {
            const category = marker.getAttribute('data-category');
            const markerCircle = marker.querySelector('circle');
            const markerText = marker.querySelector('text');
            
            if (!markerText) return;
            
            const locationName = markerText.textContent.trim();
            
            // 添加data-name和data-coords属性
            if (!marker.hasAttribute('data-name')) {
                marker.setAttribute('data-name', locationName);
            }
            
            if (!marker.hasAttribute('data-coords') && locationCoordinates[locationName]) {
                marker.setAttribute('data-coords', locationCoordinates[locationName]);
            }
            
            // 检查是否已有图标
            const existingIcon = marker.querySelector('image');
            if (existingIcon) return;
            
            // 添加适当的SVG图标
            const iconX = parseFloat(markerCircle.getAttribute('cx')) - 12;
            const iconY = parseFloat(markerCircle.getAttribute('cy')) - 12;
            
            let iconSvg = '';
            switch(category) {
                case 'attraction':
                    iconSvg = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbWFwLXBpbiI+PHBhdGggZD0iTTIxIDEwYzAgNy00LjUgMTItOSAxMnMtOS01LTktMTJhOSA5IDAgMCAxIDE4IDB6Ij48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyI+PC9jaXJjbGU+PC9zdmc+';
                    break;
                case 'restaurant':
                    iconSvg = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY29mZmVlIj48cGF0aCBkPSJNMTggOGg1YTIgMiAwIDAgMSAyIDJ2MWEyIDIgMCAwIDEtMiAyaC01Ij48L3BhdGg+PHBhdGggZD0iTTIgOGgxNnY5YTQgNCAwIDAgMS00IDRINmE0IDQgMCAwIDEtNC00VjhaIj48L3BhdGg+PGxpbmUgeDE9IjYiIHkxPSIxIiB4Mj0iNiIgeTI9IjQiPjwvbGluZT48bGluZSB4MT0iMTAiIHkxPSIxIiB4Mj0iMTAiIHkyPSI0Ij48L2xpbmU+PGxpbmUgeDE9IjE0IiB5MT0iMSIgeDI9IjE0IiB5Mj0iNCI+PC9saW5lPjwvc3ZnPg==';
                    break;
                case 'hotel':
                    iconSvg = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItaG9tZSI+PHBhdGggZD0iTTMgOWwxOC05IDE4IDl2MTNhMiAyIDAgMCAxLTIgMkgxMG0xOC0yYTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjlaIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iOSAyMiA5IDEyIDE1IDEyIDE1IDIyIj48L3BvbHlsaW5lPjwvc3ZnPg==';
                    break;
                case 'transport':
                    iconSvg = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdHJhaW4iPjxyZWN0IHg9IjQiIHk9IjIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+PHBhdGggZD0iTTQgMTFoMTYiPjwvcGF0aD48cGF0aCBkPSJNMTIgMnYxNiI+PC9wYXRoPjwvc3ZnPg==';
                    break;
            }
            
            // 创建SVG图标
            const iconElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
            iconElement.setAttribute("href", `data:image/svg+xml;base64,${iconSvg}`);
            iconElement.setAttribute("x", iconX);
            iconElement.setAttribute("y", iconY);
            iconElement.setAttribute("width", "24");
            iconElement.setAttribute("height", "24");
            marker.appendChild(iconElement);
            
            // 添加高德地图图标
            if (locationCoordinates[locationName]) {
                const amapIconX = parseFloat(markerText.getAttribute('x')) + 
                                  markerText.getComputedTextLength() + 5;
                const amapIconY = parseFloat(markerText.getAttribute('y')) - 5;
                
                const amapIcon = document.createElementNS("http://www.w3.org/2000/svg", "image");
                amapIcon.setAttribute("href", "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxNS41NTI1IDk2Mi41NmMtNS43ODU2IDAtMTEuNDY4OC0xLjk0NTYtMTYuMDc2OC01LjczNDRMODcuNDQ5NiA2NzQuMzA0Yy0zNS44NC0yOC42NzItNy4wNjU2LTgzLjc2MzIgMzguMDkyOC03My4wMTEyIDg5LjQ5NzYgMjEuNDA2NyAyNDQuMDcwNCAxMC44NTQ0IDE5OS4wNjU2LTE0MS41Njc5LTIyLjkzNzYtNzcuNzIxNi0yMi45ODg4LTE1NS41NDU2LTAuMTUzNi0yMzMuMjY3MiA4My45NjgtMjg2LjAwNDIgMzA2Ljc5MDQtMzI0LjE5ODQgNTIxLjQyMDgtODkuMDg4IDE0Ni41MzQ0IDE2MC4xNTM2IDExNi4yMjQgNDA0LjYzMzYtNjguODE2IDU1Mi44NTc2LTY1LjEyNjQgNTIuMDcwNC0xMzYuMzk2OCA5MS4xMzYtMjEyLjk5MiAxMTYuMDE2LTEzLjIwOTYgNC4zMDA4LTI0LjU3NiAxOS41MDcyLTI0LjU3NiAzMy4xMjY0djg2LjMyNzljMCAxOS4yIC0xNS41NTIgMzQuODU3Ni0zNC42MTEyIDM0Ljg1NzZ6IiBmaWxsPSIjMDA4RDM4Ij48L3BhdGg+PC9zdmc+");
                amapIcon.setAttribute("x", amapIconX);
                amapIcon.setAttribute("y", amapIconY);
                amapIcon.setAttribute("width", "18");
                amapIcon.setAttribute("height", "18");
                amapIcon.setAttribute("class", "amap-icon");
                marker.appendChild(amapIcon);
            }
            
            // 添加点击跳转高德地图功能
            marker.style.cursor = 'pointer';
            marker.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const coords = this.getAttribute('data-coords');
                
                // 判断设备类型
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                
                if (coords) {
                    // 移动设备尝试打开APP
                    if (isMobile) {
                        let mapUrl;
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            // iOS设备
                            mapUrl = `iosamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(name)}&lat=${coords.split(',')[1]}&lon=${coords.split(',')[0]}&dev=0`;
                        } else {
                            // Android设备
                            mapUrl = `androidamap://viewMap?sourceApplication=粤港之旅&poiname=${encodeURIComponent(name)}&lat=${coords.split(',')[1]}&lon=${coords.split(',')[0]}&dev=0`;
                        }
                        
                        // 添加提示信息
                        const mapOpenHint = document.createElement('div');
                        mapOpenHint.className = 'map-open-hint';
                        mapOpenHint.textContent = '正在打开高德地图...';
                        mapOpenHint.style.position = 'fixed';
                        mapOpenHint.style.top = '50%';
                        mapOpenHint.style.left = '50%';
                        mapOpenHint.style.transform = 'translate(-50%, -50%)';
                        mapOpenHint.style.padding = '10px 20px';
                        mapOpenHint.style.backgroundColor = 'rgba(0,0,0,0.7)';
                        mapOpenHint.style.color = 'white';
                        mapOpenHint.style.borderRadius = '30px';
                        mapOpenHint.style.zIndex = '1000';
                        document.body.appendChild(mapOpenHint);
                        
                        // 尝试打开APP
                        window.location.href = mapUrl;
                        
                        // 设置延时，如果APP未打开，则跳转到网页版
                        setTimeout(function() {
                            window.location.href = `https://uri.amap.com/marker?position=${coords}&name=${encodeURIComponent(name)}`;
                            document.body.removeChild(mapOpenHint);
                        }, 2000);
                    } else {
                        // 非移动设备直接打开网页版
                        window.open(`https://uri.amap.com/marker?position=${coords}&name=${encodeURIComponent(name)}`);
                    }
                } else {
                    // 如果没有坐标信息，直接搜索地点名称
                    window.open(`https://uri.amap.com/search?keyword=${encodeURIComponent(name)}&src=mypage`);
                }
            });
        });
    }

    // 美化地图轮廓
    function enhanceMapOutlines() {
        // 为所有地图轮廓添加更精细的样式
        const mapOutlines = document.querySelectorAll('.map-outline, .map-outline-hk-island, .map-outline-kowloon');
        mapOutlines.forEach(outline => {
            outline.setAttribute('fill', '#f3f3f3');
            outline.setAttribute('stroke', '#ccc');
            outline.setAttribute('stroke-width', '1.5');
            outline.style.transition = 'all 0.3s ease';
        });
        
        // 优化河流和海岸线
        const waterFeatures = document.querySelectorAll('.river, .harbor, .coast');
        waterFeatures.forEach(feature => {
            feature.setAttribute('fill', '#e1f6fd');
            feature.setAttribute('stroke', '#abd9e9');
            feature.setAttribute('stroke-width', '5');
            feature.setAttribute('opacity', '0.8');
        });
        
        // 为地区名称添加背景半透明白色块，提高可读性
        const areaLabels = document.querySelectorAll('text[font-style="italic"]');
        areaLabels.forEach(label => {
            const bbox = label.getBBox();
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', bbox.x - 5);
            rect.setAttribute('y', bbox.y - 5);
            rect.setAttribute('width', bbox.width + 10);
            rect.setAttribute('height', bbox.height + 10);
            rect.setAttribute('fill', 'white');
            rect.setAttribute('opacity', '0.6');
            rect.setAttribute('rx', '3');
            label.parentNode.insertBefore(rect, label);
        });
    }

    // 执行增强功能
    enhanceMapMarkers();
    enhanceMapOutlines();
    
    console.log('地图增强功能已加载！');

    // 初始化地图交互功能
    initMapTabs();
    initMapFilters();
    initMapMarkers();
    initMapZoom();
    initMapHighlight();
    initAMapLinks();
    
    // 解决香港地图Day 5和Day 6拥挤问题的特殊优化
    optimizeHongKongMaps();
});

// 实现地图标签切换
function initMapTabs() {
    const mapTabs = document.querySelectorAll('.map-tab');
    const mapSvgs = document.querySelectorAll('.map-svg');
    const timelines = document.querySelectorAll('.timeline');

    mapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // 移除所有活动标签
            mapTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活动标签
            this.classList.add('active');
            
            // 隐藏所有地图
            mapSvgs.forEach(svg => svg.style.display = 'none');
            // 显示当前地图
            document.getElementById(`day${day}-map`).style.display = 'block';
            
            // 隐藏所有时间线
            timelines.forEach(timeline => timeline.style.display = 'none');
            // 显示当前时间线
            document.getElementById(`day${day}-timeline`).style.display = 'block';
        });
    });
}

// 实现地图筛选功能
function initMapFilters() {
    const mapFilters = document.querySelectorAll('.map-filter');
    
    mapFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 移除所有活动筛选器
            mapFilters.forEach(f => f.classList.remove('active'));
            // 添加当前活动筛选器
            this.classList.add('active');
            
            // 获取所有标记点
            const markers = document.querySelectorAll('.map-marker');
            
            // 显示/隐藏相应的标记点
            if (category === 'all') {
                markers.forEach(marker => marker.style.display = 'block');
            } else {
                markers.forEach(marker => {
                    if (marker.getAttribute('data-category') === category) {
                        marker.style.display = 'block';
                    } else {
                        marker.style.display = 'none';
                    }
                });
            }
        });
    });
}

// 实现地图标记点交互
function initMapMarkers() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 点击地图标记点时高亮对应的时间线项
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const id = this.id;
            
            timelineItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-marker-id') === id) {
                    item.classList.add('active');
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    });
    
    // 点击时间线项时高亮对应的地图标记点
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const markerId = this.getAttribute('data-marker-id');
            
            timelineItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 找到对应的标记点并添加临时高亮效果
            const marker = document.getElementById(markerId);
            if (marker) {
                // 添加临时动画效果
                const circle = marker.querySelector('circle');
                if (circle) {
                    circle.setAttribute('data-original-r', circle.getAttribute('r'));
                    circle.setAttribute('r', parseInt(circle.getAttribute('r')) * 1.5);
                    
                    setTimeout(() => {
                        circle.setAttribute('r', circle.getAttribute('data-original-r'));
                    }, 1000);
                }
            }
        });
    });
}

// 实现地图缩放功能
function initMapZoom() {
    const zoomIn = document.querySelector('.zoom-in');
    const zoomOut = document.querySelector('.zoom-out');
    const zoomReset = document.querySelector('.zoom-reset');
    const mapSvgs = document.querySelectorAll('.map-svg');
    
    // 存储每个地图的当前缩放级别
    const zoomLevels = {};
    mapSvgs.forEach(svg => {
        zoomLevels[svg.id] = 1;
    });
    
    zoomIn.addEventListener('click', function() {
        const activeMap = document.querySelector('.map-svg[style*="display: block"]');
        if (activeMap) {
            zoomLevels[activeMap.id] *= 1.2;
            activeMap.style.transform = `scale(${zoomLevels[activeMap.id]})`;
        }
    });
    
    zoomOut.addEventListener('click', function() {
        const activeMap = document.querySelector('.map-svg[style*="display: block"]');
        if (activeMap) {
            zoomLevels[activeMap.id] /= 1.2;
            activeMap.style.transform = `scale(${zoomLevels[activeMap.id]})`;
        }
    });
    
    zoomReset.addEventListener('click', function() {
        const activeMap = document.querySelector('.map-svg[style*="display: block"]');
        if (activeMap) {
            zoomLevels[activeMap.id] = 1;
            activeMap.style.transform = 'scale(1)';
        }
    });
}

// 添加时间线与地图的联动高亮效果
function initMapHighlight() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // 鼠标悬停在时间线项上时，高亮对应的地图标记点
        item.addEventListener('mouseenter', function() {
            const markerId = this.getAttribute('data-marker-id');
            const marker = document.getElementById(markerId);
            
            if (marker) {
                const circle = marker.querySelector('circle');
                if (circle) {
                    circle.setAttribute('data-original-fill', circle.getAttribute('fill'));
                    circle.setAttribute('fill', '#ff9500');
                    circle.setAttribute('stroke-width', '3');
                }
            }
        });
        
        // 鼠标离开时恢复原样
        item.addEventListener('mouseleave', function() {
            const markerId = this.getAttribute('data-marker-id');
            const marker = document.getElementById(markerId);
            
            if (marker) {
                const circle = marker.querySelector('circle');
                if (circle) {
                    circle.setAttribute('fill', circle.getAttribute('data-original-fill'));
                    circle.setAttribute('stroke-width', '2');
                }
            }
        });
    });
}

// 优化香港地图（Day 5和Day 6）以解决拥挤问题
function optimizeHongKongMaps() {
    // 为Day 5和Day 6的地图添加额外的缩放比例
    const hkMaps = document.querySelectorAll('#day5-map, #day6-map');
    
    hkMaps.forEach(map => {
        // 为地图设置稍大的初始显示区域
        const svg = map.querySelector('svg');
        if (svg) {
            svg.setAttribute('viewBox', '150 150 500 300');
        }
        
        // 优化标记点之间的间距，防止重叠
        const markers = map.querySelectorAll('.map-marker');
        markers.forEach((marker, index) => {
            // 根据类别调整标记点文本的位置
            const text = marker.querySelector('text');
            const category = marker.getAttribute('data-category');
            
            if (text) {
                // 根据索引交错排列文本方向，减少重叠
                if (index % 2 === 0) {
                    text.setAttribute('text-anchor', 'end');
                    text.setAttribute('x', parseInt(text.getAttribute('x')) - 30);
                }
            }
        });
    });
}

// 实现高德地图链接功能
function initAMapLinks() {
    const mapMarkers = document.querySelectorAll('.map-marker[data-coords]');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const coords = this.getAttribute('data-coords');
            const name = this.getAttribute('data-name');
            
            if (coords) {
                // 创建高德地图链接提示
                showAmapTip(name);
                
                // 双击时打开高德地图
                marker.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    const amapUrl = `https://uri.amap.com/marker?position=${coords}&name=${name}`;
                    window.open(amapUrl, '_blank');
                });
            }
        });
    });
}

// 显示高德地图提示
function showAmapTip(name) {
    // 检查是否已存在提示
    let tip = document.querySelector('.amap-icon-tip');
    
    if (!tip) {
        // 创建提示元素
        tip = document.createElement('div');
        tip.className = 'amap-icon-tip';
        document.body.appendChild(tip);
    }
    
    // 更新提示内容和显示
    tip.textContent = `双击可在高德地图中查看"${name}"`;
    tip.style.opacity = '1';
    
    // 3秒后隐藏提示
    setTimeout(() => {
        tip.style.opacity = '0';
    }, 3000);
} 