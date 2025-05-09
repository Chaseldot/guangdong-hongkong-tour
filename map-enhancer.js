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
}); 