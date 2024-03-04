import { useState } from "react";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";

import ModalComponent from "./ModalComponent";

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

const NavigationMenu = () => {
  // const location = useLocation();
  const matchRecord = useMatch("/");
  const matchGraph = useMatch("/graph");
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

  //編集ボタンの判定
  const [isEditing, setIsEditing] = useState(false);

  return (
    <nav className="sideBar-pc__navMenu navPc">
      <ul className="navPc__list navPcList">
        <li className="navPcList__item navPcList__record">
          <Link to="/" className={matchRecord ? "active" : ""}>
            <div className="navPcList__link">
              <img
                alt=""
                className="navPcList__icon"
                src="img/nav-icon_record.png"
              />
              記録
            </div>
          </Link>

          {/* 記録各メニュー */}
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
                <img alt="" src="img/record_food--pcnav.png" />
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
                <img alt="" src="img/record_water--pcnav.png" />
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
                <img alt="" src="img/record_toilet--pcnav.png" />
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
                <img alt="" src="img/record_care--pcnav.png" />
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
                <img alt="" src="img/record_weight--pcnav.png" />
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
                <img alt="" src="img/record_medicine--pcnav.png" />
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
                <img alt="" src="img/record_condition--pcnav.png" />
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
                <img alt="" src="img/record_body-temperature--pcnav.png" />
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
                <img alt="" src="img/record_walking--pcnav.png" />
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
                <img alt="" src="img/record_hospital--pcnav.png" />
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
                <img alt="" src="img/record_diary--pcnav.png" />
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
                <img alt="" src="img/record_others--pcnav.png" />
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
        </li>
        <li className="navPcList__item navPcList__graph">
          <Link to="/graph" className={matchGraph ? "active" : ""}>
            <div className="navPcList__link">
              <img
                alt=""
                className="navPcList__icon"
                src="img/nav-icon_graph.png"
              />
              体重グラフ
            </div>
          </Link>
        </li>
        <li className="navPcList__item">
          <Link
            to="/calendar"
            className={location.pathname === "/calendar" ? "active" : ""}
          >
            <div className="navPcList__link">
              <img
                alt=""
                className="navPcList__icon"
                src="img/nav-icon_calendar.png"
              />
              カレンダー
            </div>
          </Link>
        </li>
        <li className="navPcList__item">
          <Link
            to="/info"
            className={location.pathname === "/info" ? "active" : ""}
          >
            <div className="navPcList__link">
              <img
                alt=""
                className="navPcList__icon"
                src="img/nav-icon_info.png"
              />
              登録情報
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
