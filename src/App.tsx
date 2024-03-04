import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Sp from "./Sp";
import ModalComponent from "./ModalComponent";
import ConditionContext from "./ConditionContext";
import { RecordEditContext } from "./RecordEditContext";
import NavItem from "./NavItem";

import * as images from "./images";

// コード分割にReact.lazyを使用
const LazyRecord = React.lazy(() => import("./Record"));
const LazyGraph = React.lazy(() => import("./Graph"));
const LazyInfo = React.lazy(() => import("./Info"));
const LazyCalendar = React.lazy(() => import("./Calendar"));

export type Item = {
  id: string;
  title: string;
  icon: string;
  time: Date;
  weight?: string;
  rating?: number;
  detailTextWater?: string;
  detailTextOthers?: string;
  detailTextMedicineName?: string;
  detailTextMedicineAmount?: string;
  detailTextFoodName?: string;
  detailTextFoodAmount?: string;
};

function App() {
  //モーダルの開閉
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // モーダルの内容
  const [modalContent, setModalContent] = useState("");

  // タイトルの管理
  const [modalTitle, setModalTitle] = useState("");

  // 初期のアイテムに一意のIDを割り当てる
  const [items, setItems] = useState<Item[]>([
    { id: uuidv4(), title: "体重", icon: "", weight: "", time: new Date() },
  ]);

  // 新しいアイテムを作成するときに一意のIDを生成
  const addItem = (item: {
    id?: string; // 追加
    title: string;
    icon: string;
    weight?: string;
    rating?: number;
  }) => {
    const id = item.id ?? uuidv4(); // idが存在しない場合は新しいIDを生成
    if (modalContent === "weight") {
      const newItems = items.map((i) =>
        i.title === "体重" ? { ...i, weight: item.weight } : i
      );
      setItems(newItems);
    } else if (modalContent === "condition") {
      const newItems = items.map((i) =>
        i.title === "体調" ? { ...i, rating: item.rating } : i
      );
      setItems(newItems);
    } else {
      setItems([...items, { id, ...item, time: new Date() }]);
    }
  };

  //ごはんの名前
  const [selectedFood, setSelectedFood] = useState("");

  //体調コンテキスト
  const [condition, setCondition] = useState(0);

  //編集ボタンの判定
  const [isEditing, setIsEditing] = useState(false);

  // 編集中のアイテム
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  return (
    <RecordEditContext.Provider value={{ editingItem, setEditingItem }}>
      <ConditionContext.Provider value={{ condition, setCondition }}>
        <Router>
          <div className="container">
            {/* サイドバー */}
            <div className="sideBar-pc">
              <h1 className="sideBar-pc__logo">
                <Link to="/">
                  <img alt="" src={images.img_logo} />
                </Link>
              </h1>
              <nav className="sideBar-pc__navMenu navPc">
                <ul className="navPc__list navPcList">
                  <NavItem
                    to="/"
                    icon={images.img_IconRecord}
                    activeIcon={images.img_IconRecordActive}
                  >
                    記録
                  </NavItem>

                  {/* 記録 各メニュー */}
                  <div className="recordButtonWrapper-pc record-pc">
                    <div className="record-pc__space" />
                    {/* ごはんボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("food");
                          setModalTitle("ごはん");
                          setSelectedFood("");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_food__pcnav} />
                        ごはん
                      </button>
                    </Link>

                    {/* お水ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("water");
                          setModalTitle("お水");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_water__pcnav} />
                        お水
                      </button>
                    </Link>

                    {/* トイレボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("toilet");
                          setModalTitle("トイレ");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_toilet__pcnav} />
                        トイレ
                      </button>
                    </Link>

                    {/* ケアボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("care");
                          setModalTitle("ケア");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_care__pcnav} />
                        ケア
                      </button>
                    </Link>

                    {/* 体重ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("weight");
                          setModalTitle("体重");
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_weight__pcnav} />
                        体重
                      </button>
                    </Link>

                    {/* お薬ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("medicine");
                          setModalTitle("お薬");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_medicine__pcnav} />
                        お薬
                      </button>
                    </Link>

                    {/* 体調ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("condition");
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_condition__pcnav} />
                        体調
                      </button>
                    </Link>

                    {/* 体温ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("body-temperature");
                          setModalTitle("体温");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img
                          alt=""
                          src={images.img_record_bodyTemperature__pcnav}
                        />
                        体温
                      </button>
                    </Link>

                    {/* お散歩ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("walking");
                          setModalTitle("お散歩");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_walking__pcnav} />
                        お散歩
                      </button>
                    </Link>

                    {/* 病院ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("hospital");
                          setModalTitle("病院");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_hospital__pcnav} />
                        病院
                      </button>
                    </Link>

                    {/* 日記ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("diary");
                          setModalTitle("日記");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_diary__pcnav} />
                        日記
                      </button>
                    </Link>

                    {/* その他ボタン */}
                    <Link to="/" className="record-pc__buttonLink">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setModalContent("others");
                          setModalTitle("その他");
                          setIsEditing(false); // 新規入力モード
                        }}
                        className="record-pc__button"
                      >
                        <img alt="" src={images.img_record_others__pcnav} />
                        その他
                      </button>
                    </Link>

                    {/* モーダル呼び出し */}
                    {modalIsOpen && (
                      <ModalComponent
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        modalContent={modalContent}
                        modalTitle={modalTitle}
                        onInputClick={addItem}
                        selectedFood={selectedFood}
                        setSelectedFood={setSelectedFood}
                        isEditing={isEditing}
                      />
                    )}
                  </div>

                  {/* ナビメニュー 体重グラフ */}
                  <NavItem
                    to="/graph"
                    icon={images.img_IconGraph}
                    activeIcon={images.img_IconGraphActive}
                  >
                    体重グラフ
                  </NavItem>

                  {/* ナビメニュー カレンダー */}
                  <NavItem
                    to="/calendar"
                    icon={images.img_IconCalendar}
                    activeIcon={images.img_IconCalendarActive}
                  >
                    カレンダー
                  </NavItem>

                  {/* ナビメニュー 登録情報 */}
                  <NavItem
                    to="/info"
                    icon={images.img_IconInfo}
                    activeIcon={images.img_IconInfoActive}
                  >
                    登録情報
                  </NavItem>
                </ul>
              </nav>
            </div>

            {/* メインコンテンツ */}
            <div className="Main">
              {/* SPページ */}
              <Sp
                setModalIsOpen={setModalIsOpen}
                setModalContent={setModalContent}
                setModalTitle={setModalTitle}
              />

              {/* PCページ */}
              <div className="inner--pc">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* 記録ページ */}
                    <Route
                      index
                      element={
                        <LazyRecord
                          items={items}
                          setModalIsOpen={setModalIsOpen}
                          setIsEditing={setIsEditing}
                          setModalContent={setModalContent}
                        />
                      }
                    />
                    {/* 体重グラフページ */}
                    <Route path="/graph" element={<LazyGraph />} />
                    {/* カレンダーページ */}
                    <Route path="/calendar" element={<LazyCalendar />} />
                    {/* 登録情報ページ */}
                    <Route path="/info" element={<LazyInfo />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </div>
        </Router>
      </ConditionContext.Provider>
    </RecordEditContext.Provider>
  );
}

export default App;
