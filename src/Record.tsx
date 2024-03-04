import { useContext } from "react";
import ConditionContext from "./ConditionContext";
import { RecordEditContext } from "./RecordEditContext";
import { Item } from "./App";

import img_conditionOn from "./img/daily-summary_condition-mark--on.png";
import img_conditionOff from "./img/daily-summary_condition-mark--off.png";
import img_dailySummary_weight from "./img/daily-summary_weight.png";
import img_dailySummary_condition from "./img/daily-summary_condition.png";
import img_dailySummary_food from "./img/daily-summary_food.png";
import img_dailySummary_water from "./img/daily-summary_water.png";
import img_EditButton from "./img/daily-log_edit.png";

type RecordProps = {
  items: {
    id: string;
    title: string;
    icon: string;
    time: Date;
    weight?: string;
    detailTextFoodName?: string;
    detailTextFoodAmount?: string;
    detailTextWater?: string;
    detailTextOthers?: string;
    detailTextMedicineName?: string;
    detailTextMedicineAmount?: string;
    selectedFoodName?: string;
    imageUrl?: string;
  }[];
  setModalIsOpen: (isOpen: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setModalContent: (content: string) => void;
};

const Record: React.FC<RecordProps> = ({
  items,
  setModalIsOpen,
  setIsEditing,
  setModalContent,
}) => {
  //現在の日付
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  // ごはんの量を合計する関数
  const calculateTotalFoodAmount = (items: RecordProps["items"]) => {
    return items.reduce((total, item) => {
      if (item.title === "ごはん") {
        return total + Number(item.detailTextFoodAmount); // 修正
      }
      return total;
    }, 0);
  };

  // お水の量を合計する関数
  const calculateTotalWaterAmount = (items: RecordProps["items"]) => {
    return items.reduce((total, item) => {
      if (item.title === "お水") {
        return total + Number(item.detailTextWater);
      }
      return total;
    }, 0);
  };

  //体調のコンテキスト
  const conditionContext = useContext(ConditionContext);

  //編集中のアイテムのコンテキスト
  const { setEditingItem } = useContext(RecordEditContext);

  // 編集ボタンのクリックイベント
  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setModalIsOpen(true);
    setIsEditing(true);

    // アイテムのタイトルによってmodalContentを設定する
    if (item.title === "お水") {
      setModalContent("water");
    } else if (item.title === "トイレ") {
      setModalContent("toilet");
    }
  };

  return (
    <div className="recordPage page SpContentsMargin">
      {/* その日のまとめ*/}
      <div className="dailySummary">
        <h3 className="dailySummary__heading page__subHeading page__subHeading--pc">
          {`${year}年${month}月${date}日のまとめ`}
        </h3>
        <h3 className="dailySummary__heading page__subHeading page__subHeading--sp">
          一日のまとめ
        </h3>
        <ul className="dailySummary__list dailySummaryList">
          <li className="dailySummaryList__item">
            <div className="dailySummaryList__heading">
              <div className="dailySummaryList__icon">
                <img alt="" src={img_dailySummary_weight} />
              </div>
              <h4 className="dailySummaryList__title">体重</h4>
            </div>
            <div className="dailySummaryList__main">
              <p className="dailySummaryList__text">
                {items.find((item) => item.title === "体重")?.weight || "--"}kg
              </p>
            </div>
          </li>
          <li className="dailySummaryList__item">
            <div className="dailySummaryList__heading">
              <div className="dailySummaryList__icon">
                <img alt="" src={img_dailySummary_condition} />
              </div>
              <h4 className="dailySummaryList__title">体調</h4>
            </div>
            <div className="dailySummaryList__main">
              <ul className="dailySummaryList__condition-mark conditionList">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="conditionList__item">
                    <img
                      alt=""
                      src={
                        index < conditionContext.condition
                          ? img_conditionOn
                          : img_conditionOff
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="dailySummaryList__item">
            <div className="dailySummaryList__heading">
              <div className="dailySummaryList__icon">
                <img alt="" src={img_dailySummary_food} />
              </div>
              <h4 className="dailySummaryList__title">ごはん</h4>
            </div>
            <div className="dailySummaryList__main">
              <p className="dailySummaryList__text">
                {calculateTotalFoodAmount(items)}g
              </p>
            </div>
          </li>
          <li className="dailySummaryList__item">
            <div className="dailySummaryList__heading">
              <div className="dailySummaryList__icon">
                <img alt="" src={img_dailySummary_water} />
              </div>
              <h4 className="dailySummaryList__title">お水</h4>
            </div>
            <div className="dailySummaryList__main">
              <p className="dailySummaryList__text">
                {calculateTotalWaterAmount(items)}ml
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* 一日の記録 */}
      <div className="dailyLog">
        {/* コンテンツ */}
        <h3 className="dailyLog__heading page__subHeading">一日の記録</h3>
        <ul className="dailyLog__list dailyLogList">
          {items
            .filter((item) => item.title !== "体重" && item.title !== "体調") // "体重"と"体調"を除外
            .map((item) => (
              <li key={item.id} className="dailyLogList__item">
                <time className="dailyLogList__time">
                  {item.time.toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
                <div className="dailyLogList__box">
                  <div className="dailyLogList__headSide">
                    <div className="dailyLogList__type">
                      <div className="dailyLogList__typeIcon">
                        <img alt="" src={item.icon} />
                      </div>
                      <p className="dailyLogList__typeText">{item.title}</p>
                    </div>
                    {/* 編集ボタン */}
                    <button
                      onClick={() => handleEditClick(item)}
                      className="dailyLogList__editButton"
                    >
                      <img alt="" src={img_EditButton} />
                    </button>
                  </div>

                  <div className="dailyLogList__contentSide">
                    <div className="dailyLogList__detail">
                      {item.title === "ごはん" && (
                        <>
                          <p className="dailySummaryList__text01">
                            {item.detailTextFoodName || "--"}
                          </p>
                          <p className="dailySummaryList__text02">
                            {item.detailTextFoodAmount || "--"}g
                          </p>
                        </>
                      )}
                      {item.title === "お薬" && (
                        <>
                          <p className="dailySummaryList__text01 dailySummaryList__medicineItem">
                            名前：{item.detailTextMedicineName || "--"}
                          </p>
                          <p className="dailySummaryList__text02 dailySummaryList__medicineItem">
                            量：{item.detailTextMedicineAmount || "--"}
                          </p>
                        </>
                      )}
                      {item.title === "お水" && (
                        <p className="dailySummaryList__text01">
                          {item.detailTextWater || "--"}ml
                        </p>
                      )}
                      {item.title === "体温" && (
                        <p className="dailySummaryList__text01">
                          {item.detailTextOthers || "--"}℃
                        </p>
                      )}
                      {[
                        "トイレ",
                        "ケア",
                        "お散歩",
                        "病院",
                        "日記",
                        "その他",
                      ].includes(item.title) && (
                        <p className="dailySummaryList__text01">
                          {(item.detailTextOthers || "--")
                            .split("\n")
                            .map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                        </p>
                      )}
                    </div>
                    <div className="dailyLogList__image">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="アップロードされた画像" />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Record;
