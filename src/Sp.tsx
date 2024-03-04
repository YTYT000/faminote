import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import img_IconRecord from "./img/nav-icon_record.png";
import img_IconRecordActive from "./img/nav-icon_record--active.png";
import img_IconGraph from "./img/nav-icon_graph.png";
import img_IconGraphActive from "./img/nav-icon_graph--active.png";
import img_IconCalendar from "./img/nav-icon_calendar.png";
import img_IconCalendarActive from "./img/nav-icon_calendar--active.png";
import img_IconInfo from "./img/nav-icon_info.png";
import img_IconInfoActive from "./img/nav-icon_info--active.png";
import img_RecordButton_sp from "./img/record-button--sp.png";
import img_record_food__spnav from "./img/record_food--spnav.png";
import img_record_water__spnav from "./img/record_water--spnav.png";
import img_record_toilet__spnav from "./img/record_toilet--spnav.png";
import img_record_care__spnav from "./img/record_care--spnav.png";
import img_record_weight__spnav from "./img/record_weight--spnav.png";
import img_record_medicine__spnav from "./img/record_medicine--spnav.png";
import img_record_condition__spnav from "./img/record_condition--spnav.png";
import img_record_bodyTemperature__spnav from "./img/record_body-temperature--spnav.png";
import img_record_walking__spnav from "./img/record_walking--spnav.png";
import img_record_hospital__spnav from "./img/record_hospital--spnav.png";
import img_record_diary__spnav from "./img/record_diary--spnav.png";
import img_record_others__spnav from "./img/record_others--spnav.png";

interface SpProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Sp: React.FC<SpProps> = ({
  setModalIsOpen,
  setModalContent,
  setModalTitle,
}) => {
  // 現在のルートの情報を取得
  const location = useLocation();

  // 現在のパスを取得
  const path = location.pathname;

  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate = `${year}年${month}月${date}日`;

  // ヘッダーテキストを初期化
  let headingText;

  // 現在のパスに基づいてヘッダーテキストを設定
  switch (path) {
    case "/":
    case "/calendar":
      headingText = formattedDate;
      break;
    case "/graph":
      headingText = "体重グラフ";
      break;
    case "/info":
      headingText = "登録情報";
      break;
    default:
      headingText = "";
  }

  // 記録メニューが開いているかどうかを追跡する状態変数
  const [isRecordMenuOpen, setIsRecordMenuOpen] = useState(false);

  // 記録メニューを開閉する関数
  const toggleRecordMenu = () => {
    setIsRecordMenuOpen((prevIsRecordMenuOpen) => !prevIsRecordMenuOpen);
  };

  // useEffectフックを使用してisRecordMenuOpenステートの変更を監視
  useEffect(() => {
    setIsRecordSpVisible(isRecordMenuOpen);
  }, [isRecordMenuOpen]);

  // 記録メニューを閉じる関数
  const closeRecordMenu = () => {
    setIsRecordMenuOpen(false);
  };

  // 下部ナビメニューのリンクをクリック時
  const handleLinkClick = (e: React.MouseEvent, linkPath: string) => {
    if (location.pathname === linkPath) {
      e.preventDefault();
    }
    closeRecordMenu();
  };

  //モーダルの表示
  const [isRecordSpVisible, setIsRecordSpVisible] = useState(true);

  // モーダルを開く関数
  const openModal = (content: string, title: string) => {
    setModalIsOpen(true);
    setModalContent(content);
    setModalTitle(title);
    setIsRecordSpVisible(false);
    closeRecordMenu();
  };

  return (
    <div className="sp">
      {/* spヘッダー */}
      <div className="sp__header header-sp">
        <div className="header-sp__inner">
          <h2 className="header-sp__heading header-sp__item">{headingText}</h2>
        </div>
      </div>
      {/* sp下部ナビメニュー */}
      <div className="sp__sideBar sideBar-sp">
        <nav className="sideBar-pc__navMenu navSp">
          <ul className="navSp__list navSpList">
            <li className="navSpList__item navSpList__record">
              <Link to="/" onClick={(e) => handleLinkClick(e, "/")}>
                <div className="navSpList__link">
                  <img
                    alt=""
                    className="navSpList__icon"
                    src={path === "/" ? img_IconRecordActive : img_IconRecord}
                  />
                  <span className={path === "/" ? "activeMenuName" : ""}>
                    記録
                  </span>
                </div>
              </Link>
            </li>
            <li className="navSpList__item navSpList__record">
              <Link to="/graph" onClick={(e) => handleLinkClick(e, "/graph")}>
                <div className="navSpList__link">
                  <img
                    alt=""
                    className="navSpList__icon"
                    src={
                      path === "/graph" ? img_IconGraphActive : img_IconGraph
                    }
                  />
                  <span className={path === "/graph" ? "activeMenuName" : ""}>
                    グラフ
                  </span>
                </div>
              </Link>
            </li>
            <li className="navSpList__item navSpList__record">
              <Link
                to="/calendar"
                onClick={(e) => handleLinkClick(e, "/calendar")}
              >
                <div className="navSpList__link">
                  <img
                    alt=""
                    className="navSpList__icon"
                    src={
                      path === "/calendar"
                        ? img_IconCalendarActive
                        : img_IconCalendar
                    }
                  />
                  <span
                    className={path === "/calendar" ? "activeMenuName" : ""}
                  >
                    カレンダー
                  </span>
                </div>
              </Link>
            </li>
            <li className="navSpList__item navSpList__record">
              <Link to="/info" onClick={(e) => handleLinkClick(e, "/info")}>
                <div className="navSpList__link">
                  <img
                    alt=""
                    className="navSpList__icon"
                    src={path === "/info" ? img_IconInfoActive : img_IconInfo}
                  />
                  <span className={path === "/info" ? "activeMenuName" : ""}>
                    登録情報
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* 記録メニュー開閉ボタン */}
      {location.pathname === "/" && (
        <button
          className="recordMenuOpenButton-sp"
          onClick={() => {
            toggleRecordMenu();
            setIsRecordSpVisible(true);
          }}
        >
          <img alt="" src={img_RecordButton_sp} />
        </button>
      )}
      {/* 記録メニュー */}
      {isRecordMenuOpen && (
        <div
          className={`recordButtonWrapper-sp record-sp SpContentsMargin ${
            isRecordSpVisible ? "" : "record-sp--hidden"
          }`}
        >
          <button
            onClick={() => openModal("food", "ごはん")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_food__spnav} />
            ごはん
          </button>
          <button
            onClick={() => openModal("water", "お水")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_water__spnav} />
            お水
          </button>
          <button
            onClick={() => openModal("toilet", "トイレ")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_toilet__spnav} />
            トイレ
          </button>
          <button
            onClick={() => openModal("care", "ケア")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_care__spnav} />
            ケア
          </button>
          <button
            onClick={() => openModal("weight", "体重")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_weight__spnav} />
            体重
          </button>
          <button
            onClick={() => openModal("medicine", "お薬")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_medicine__spnav} />
            お薬
          </button>
          <button
            onClick={() => openModal("condition", "体調")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_condition__spnav} />
            体調
          </button>
          <button
            onClick={() => openModal("body-temperature", "体温")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_bodyTemperature__spnav} />
            体温
          </button>
          <button
            onClick={() => openModal("walking", "お散歩")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_walking__spnav} />
            お散歩
          </button>
          <button
            onClick={() => openModal("hospital", "病院")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_hospital__spnav} />
            病院
          </button>
          <button
            onClick={() => openModal("diary", "日記")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_diary__spnav} />
            日記
          </button>
          <button
            onClick={() => openModal("others", "その他")}
            className="record-sp__button"
          >
            <img alt="" src={img_record_others__spnav} />
            その他
          </button>
        </div>
      )}
    </div>
  );
};

export default Sp;
