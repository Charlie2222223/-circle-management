import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const initialData = [
  {
    name: '情報 デリート君',
    details: '希望日：週4\nオファー：OK！\n卒年：25\n開発分野：アプリ',
    status: 'オファー'
  },
  {
    name: '情報 化学君',
    details: '希望日：週1\nオファー：OK！\n卒年：26\n開発分野：Web',
    status: 'オファー'
  },
  {
    name: '情報 リテラシー君',
    details: '希望日：週1\nオファー：OK！\n卒年：26\n開発分野：Web',
    status: 'オファー中'
  },
  {
    name: '情報 難民君',
    details: '希望日：週1\nオファー：NG！\n卒年：26\n開発分野：Web',
    status: 'オファー'
  },
  {
    name: '情報 処理君',
    details: '希望日：週1\nオファー：OK！\n卒年：26\n開発分野：Web',
    status: 'オファー済'
  }
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [scrollPosition, setScrollPosition] = useState(0);
  const loader = useRef(null);

  const loadMore = useCallback(() => {
    setData(prevData => [...prevData, ...initialData]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  const handleScroll = useCallback((e) => {
    setScrollPosition(e.target.scrollTop);
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="icon">マイアイコン表示</div>
          <div className="name">名前</div>
        </div>
        <div className="groups">
          <div className="group">グループ1</div>
          <div className="group">グループ2</div>
          <div className="group">グループ3</div>
          <div className="group">グループ4</div>
        </div>
      </div>
      <div className="main">
        <a href="#" className="example1">角丸ボタン</a>
        <a href="#" className="example2">角丸ボタン</a>
        <div className="menu">☰</div>
        <div className="scrollable" onScroll={handleScroll}>
          {data.map((item, index) => {
            const cardHeight = 150; // カードの高さ
            const cardSpacing = 30; // カード間の間隔
            const elementTop = index * (cardHeight + cardSpacing); // 各カードの上部位置
            const elementCenter = elementTop + cardHeight / 2; // 各カードの中央位置
            const viewportCenter = window.innerHeight * 0.5; // ビューポートの中央をやや下に設定
            const distanceFromCenter = Math.abs(elementCenter - (scrollPosition + viewportCenter));
            const scale = Math.max(1 - distanceFromCenter / (viewportCenter * 1.5), 0.5);

            return (
              <div
                key={index}
                className="card"
                style={{ transform: `scale(${scale})`, transition: 'transform 0.2s' }}
              >
                <div class="circles">
                <div class="circle">
                <div id="name">{item.name}</div>
                </div>
                </div>
                <div>{item.details.split('\n').map((line, i) => (<div key={i}>{line}</div>))}</div>
                <div>{item.status}</div>
              </div>
            );
          })}
          <div ref={loader} className="loader">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default App;