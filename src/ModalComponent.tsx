import React, { useState, useEffect, useRef, useContext } from "react";
import Modal from "react-modal";

import ConditionContext, { ConditionContextType } from "./ConditionContext";
import { RecordEditContext } from "./RecordEditContext";
import * as images from "./images";

type ModalComponentProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  modalContent: string;
  modalTitle: string;
  selectedFood: string;
  setSelectedFood: (food: string) => void;
  onInputClick: (content: {
    title: string;
    icon: string;
    weight?: string;
    time: Date;
    detailTextFoodName?: string;
    detailTextFoodAmount?: string;
    detailTextWater?: string;
    detailTextOthers?: string;
    detailTextMedicineName: string;
    detailTextMedicineAmount: string;
    selectedFoodName: string;
    imageUrl?: string;
  }) => void;
  isEditing: boolean;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  modalContent,
  modalTitle,
  onInputClick,
  selectedFood,
  setSelectedFood,
  isEditing,
}) => {
  // 画像添付（状態）
  const [fileName, setFileName] = useState("");

  // 画像URL（状態）
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileName(event.target.files[0] ? event.target.files[0].name : "");
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  // ConditionContextから現在の体調レベルとその更新関数を取得
  const conditionContext = useContext<ConditionContextType>(ConditionContext);

  // モーダル内での体調レベル（状態）をローカル状態として管理
  const [localRating, setLocalRating] = useState(conditionContext.condition);

  // ハートがクリックされたときにローカル状態を更新
  const handleClick = (index: number) => {
    setLocalRating(index + 1);
  };

  // 入力ボタンが押されたときにグローバル状態を更新
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    conditionContext.setCondition(localRating);
  };

  // 体重の入力値
  const [weight, setWeight] = useState("");

  // ごはんの名前の入力値
  const [detailTextFoodName, setDetailTextFoodName] = useState("");

  // ごはんの量の入力値
  const [detailTextFoodAmount, setDetailTextFoodAmount] = useState("");

  // お水の入力値
  const [detailTextWater, setDetailTextWater] = useState("");

  // お薬の名前の入力値
  const [detailTextMedicineName, setDetailTextMedicineName] = useState("");

  // お薬の量の入力値
  const [detailTextMedicineAmount, setDetailTextMedicineAmount] = useState("");

  // その他の入力値
  const [detailTextOthers, setDetailTextOthers] = useState("");

  //モーダルオープン時に入力欄へフォーカス
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //編集中のアイテムのコンテキスト
  const { editingItem, setEditingItem } = useContext(RecordEditContext);

  //記録各アイテムのアイコン
  const icons: Record<string, string> = {
    food: images.img_record_food,
    water: images.img_record_water,
    toilet: images.img_record_toilet,
    care: images.img_record_care,
    medicine: images.img_record_medicine,
    "body-temperature": images.img_record_bodyTemperature,
    walking: images.img_record_walking,
    hospital: images.img_record_hospital,
    diary: images.img_record_diary,
    others: images.img_record_others,
  };

  //モーダル開閉時のイベント
  useEffect(() => {
    if (isOpen) {
      //モーダルオープン時に入力欄へフォーカス
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        } else if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
      setSelectedFood("");
    } else {
      // モーダルが閉じるときに内容をリセット
      setFileName("");
    }
  }, [isOpen, setSelectedFood]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="overlay"
      className="modal__contentWrap"
    >
      <button onClick={onRequestClose} className="modal__exitButton">
        <img alt="" src={images.img_exitButton} />
      </button>
      <div className="modal__content">
        <div className="modal__inner">
          <form
            className="modal__form"
            onSubmit={(e) => {
              e.preventDefault();
              onRequestClose();
              onInputClick({
                title: modalTitle,
                icon: icons[modalContent],
                weight,
                detailTextWater,
                detailTextFoodName,
                detailTextFoodAmount,
                detailTextOthers,
                detailTextMedicineName,
                detailTextMedicineAmount,
                selectedFoodName: selectedFood,
                time: new Date(),
                imageUrl: imageUrl || undefined,
              });
              handleSubmit(e);
            }}
          >
            <table className="modalList">
              <tbody>
                {/* ごはん */}
                {modalContent === "food" && (
                  <>
                    {/* ごはんの名前 */}
                    <tr className="modalList__item">
                      <th className="modalList__heading">
                        <label className="inputLabel" htmlFor="foodType">
                          ごはんの名前
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          ref={textareaRef}
                          className="styledInputField tallInputField"
                          id="foodName"
                          name="foodName"
                          value={
                            isEditing &&
                            editingItem &&
                            editingItem.detailTextFoodName !== undefined
                              ? editingItem.detailTextFoodName
                              : detailTextFoodName
                          }
                          onChange={(e) => {
                            setDetailTextFoodName(e.target.value);
                            if (isEditing && editingItem) {
                              setEditingItem({
                                ...editingItem,
                                detailTextFoodName: e.target.value,
                              });
                            }
                          }}
                        />
                      </td>
                    </tr>
                    {/* ごはんの量 */}
                    <tr className="modalList__item">
                      <th className="modalList__heading">
                        <label className="inputLabel" htmlFor="foodAmount">
                          ごはんの量
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField"
                          id="foodAmount"
                          name="foodAmount"
                          type="number"
                          value={
                            isEditing &&
                            editingItem &&
                            editingItem.detailTextFoodAmount !== undefined
                              ? editingItem.detailTextFoodAmount
                              : detailTextFoodAmount
                          }
                          onChange={(e) => {
                            setDetailTextFoodAmount(e.target.value);
                            if (isEditing && editingItem) {
                              setEditingItem({
                                ...editingItem,
                                detailTextFoodAmount: e.target.value,
                              });
                            }
                          }}
                        />
                        <p className="modalList__inputFieldText">g</p>
                      </td>
                    </tr>
                  </>
                )}

                {/* お水の量 */}
                {modalContent === "water" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="waterAmount">
                        お水の量
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <input
                        ref={inputRef}
                        className="styledInputField"
                        id="waterAmount"
                        name="waterAmount"
                        type="number"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextWater !== undefined
                            ? editingItem.detailTextWater
                            : detailTextWater
                        }
                        onChange={(e) => {
                          setDetailTextWater(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextWater: e.target.value,
                            });
                          }
                        }}
                      />
                      <p className="modalList__inputFieldText">ml</p>
                    </td>
                  </tr>
                )}

                {/* トイレ */}
                {modalContent === "toilet" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="toilet">
                        トイレ
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="toilet"
                        name="toilet"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}

                {/* ケア */}
                {modalContent === "care" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="care">
                        ケア
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="care"
                        name="care"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}

                {/* 体重 */}
                {modalContent === "weight" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="weight">
                        体重
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <input
                        ref={inputRef}
                        className="styledInputField"
                        id="weight"
                        name="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => {
                          setWeight(e.target.value);
                        }}
                      />
                      <p className="modalList__inputFieldText">kg</p>
                    </td>
                  </tr>
                )}

                {/* お薬 */}
                {modalContent === "medicine" && (
                  <>
                    {/* お薬の名前 */}
                    <tr className="modalList__item">
                      <th className="modalList__heading">
                        <label className="inputLabel" htmlFor="medicineName">
                          お薬の名前
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          ref={textareaRef}
                          className="styledInputField tallInputField"
                          id="medicineName"
                          name="medicineName"
                          value={
                            isEditing &&
                            editingItem &&
                            editingItem.detailTextMedicineName !== undefined
                              ? editingItem.detailTextMedicineName
                              : detailTextMedicineName
                          }
                          onChange={(e) => {
                            setDetailTextMedicineName(e.target.value);
                            if (isEditing && editingItem) {
                              setEditingItem({
                                ...editingItem,
                                detailTextMedicineName: e.target.value,
                              });
                            }
                          }}
                        />
                      </td>
                    </tr>

                    {/* お薬の量 */}
                    <tr className="modalList__item">
                      <th className="modalList__heading">
                        <label className="inputLabel" htmlFor="medicineAmount">
                          お薬の量
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          className="styledInputField tallInputField"
                          id="medicineAmount"
                          name="medicineAmount"
                          value={
                            isEditing &&
                            editingItem &&
                            editingItem.detailTextMedicineAmount !== undefined
                              ? editingItem.detailTextMedicineAmount
                              : detailTextMedicineAmount
                          }
                          onChange={(e) => {
                            setDetailTextMedicineAmount(e.target.value);
                            if (isEditing && editingItem) {
                              setEditingItem({
                                ...editingItem,
                                detailTextMedicineAmount: e.target.value,
                              });
                            }
                          }}
                        />
                      </td>
                    </tr>
                  </>
                )}

                {/* 体調 */}
                {modalContent === "condition" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="condition">
                        体調
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <div className="heartContainer">
                        {[...Array(5)].map((_, index) => (
                          <img
                            key={index}
                            className="heart"
                            src={
                              index < localRating
                                ? images.img_conditionOn
                                : images.img_conditionOff
                            }
                            onClick={() => handleClick(index)}
                            alt="heart"
                            style={{ cursor: "pointer" }}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}

                {/* 体温 */}
                {modalContent === "body-temperature" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="bodyTemperature">
                        体温
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <input
                        ref={inputRef}
                        className="styledInputField"
                        id="bodyTemperature"
                        name="bodyTemperature"
                        type="text"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                      <p className="modalList__inputFieldText">℃</p>
                    </td>
                  </tr>
                )}

                {/* お散歩 */}
                {modalContent === "walking" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="walking">
                        お散歩
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="walking"
                        name="walking"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}

                {/* 病院 */}
                {modalContent === "hospital" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="bodyTemperature">
                        病院
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="bodyTemperature"
                        name="bodyTemperature"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}

                {/* 日記 */}
                {modalContent === "diary" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="diary">
                        日記
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="diary"
                        name="diary"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}
                {/* その他 */}
                {modalContent === "others" && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="others">
                        その他
                      </label>
                    </th>
                    <td className="modalList__inputField">
                      <textarea
                        ref={textareaRef}
                        className="styledInputField memoInputField"
                        id="others"
                        name="others"
                        value={
                          isEditing &&
                          editingItem &&
                          editingItem.detailTextOthers !== undefined
                            ? editingItem.detailTextOthers
                            : detailTextOthers
                        }
                        onChange={(e) => {
                          setDetailTextOthers(e.target.value);
                          if (isEditing && editingItem) {
                            setEditingItem({
                              ...editingItem,
                              detailTextOthers: e.target.value,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                )}
                {/* 画像添付 */}
                {!(
                  modalContent === "weight" || modalContent === "condition"
                ) && (
                  <tr className="modalList__item">
                    <th className="modalList__heading">
                      <label className="inputLabel" htmlFor="fileInput">
                        画像添付
                      </label>
                    </th>
                    <td>
                      <div className="attachment">
                        <label className="attachment__label">
                          <input
                            className="fileInput"
                            name="ファイル添付"
                            type="file"
                            onChange={handleFileChange}
                          />
                          ファイルを選択
                        </label>
                        {fileName ? (
                          <span className="fileName">{fileName}</span>
                        ) : (
                          <span className="fileName">選択されていません</span>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* ボタン */}
            <div className="modal__buttonWrap modalButton__wrap">
              {isEditing ? (
                // 削除ボタン（リストアイテムから）
                <button
                  className="button modal__button modal__deleteButton button--white"
                  type="button"
                  onClick={onRequestClose}
                >
                  削除
                </button>
              ) : (
                // 閉じるボタン（ナビメニューから）
                <button
                  className="button modal__button modal__closeButton button--white"
                  type="button"
                  onClick={onRequestClose}
                >
                  閉じる
                </button>
              )}
              {isEditing ? (
                //編集ボタン（リストアイテムから）
                <button
                  className="button modal__button modal__editButton button--orange"
                  type="submit"
                  onClick={onRequestClose}
                >
                  編集
                </button>
              ) : (
                //入力ボタン（ナビメニューから）
                <button
                  className="button modal__button modal__inputButton button--orange"
                  type="submit"
                >
                  入力
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
