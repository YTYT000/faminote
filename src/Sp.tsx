import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
                    src={
                      path === "/"
                        ? "img/nav-icon_record--active.png"
                        : "img/nav-icon_record.png"
                    }
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
                      path === "/graph"
                        ? "img/nav-icon_graph--active.png"
                        : "img/nav-icon_graph.png"
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
                        ? "img/nav-icon_calendar--active.png"
                        : "img/nav-icon_calendar.png"
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
                    src={
                      path === "/info"
                        ? "img/nav-icon_info--active.png"
                        : "img/nav-icon_info.png"
                    }
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
          <img alt="" src="img/record-button--sp.png" />
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
            <img alt="" src="img/record-spmenu_food.png" />
            ごはん
          </button>
          <button
            onClick={() => openModal("water", "お水")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_water.png" />
            お水
          </button>
          <button
            onClick={() => openModal("toilet", "トイレ")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_toilet.png" />
            トイレ
          </button>
          <button
            onClick={() => openModal("care", "ケア")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_care.png" />
            ケア
          </button>
          <button
            onClick={() => openModal("weight", "体重")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_weight.png" />
            体重
          </button>
          <button
            onClick={() => openModal("medicine", "お薬")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_medicine.png" />
            お薬
          </button>
          <button
            onClick={() => openModal("condition", "体調")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_condition.png" />
            体調
          </button>
          <button
            onClick={() => openModal("body-temperature", "体温")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_body-temperature.png" />
            体温
          </button>
          <button
            onClick={() => openModal("walking", "お散歩")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_walking.png" />
            お散歩
          </button>
          <button
            onClick={() => openModal("hospital", "病院")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_hospital.png" />
            病院
          </button>
          <button
            onClick={() => openModal("diary", "日記")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_diary.png" />
            日記
          </button>
          <button
            onClick={() => openModal("others", "その他")}
            className="record-sp__button"
          >
            <img alt="" src="img/record-spmenu_others.png" />
            その他
          </button>
        </div>
      )}
    </div>
  );
};

export default Sp;
