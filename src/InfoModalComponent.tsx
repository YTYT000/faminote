import React, { useState } from "react";
import Modal from "react-modal";

import img_exitButton from "./img/modal_exitbutton.png";

interface InfoModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setInfoImageSrc: (src: string) => void;
  setInfoName: (name: string) => void;
  infoName: string;
  setInfoBreed: (name: string) => void;
  infoBreed: string;
  setInfoBirthYear: (year: number) => void;
  infoBirthYear: number;
  setInfoBirthMonth: (month: number) => void;
  infoBirthMonth: number;
  setInfoBirthDate: (date: number) => void;
  infoBirthDate: number;
  setInfoGender: (gender: string) => void;
  infoGender: string;
  setInfoNeutering: (neutering: string) => void;
  infoNeutering: string;
  setInfoAllergy: (allergy: string) => void;
  infoAllergy: string;
  setInfoMedicalHistory: (medicalHistory: string) => void;
  infoMedicalHistory: string;
  setInfoMicrochipNumber: (microchipNumber: string) => void;
  infoMicrochipNumber: string;
  setInfoHospitalName: (hospitalName: string) => void;
  infoHospitalName: string;
  setInfoPhoneNumber: (phoneNumber: string) => void;
  infoPhoneNumber: string;
  setInfoDoctorName: (doctorName: string) => void;
  infoDoctorName: string;
  setInfoHospitalMemo: (hospitalMemo: string) => void;
  infoHospitalMemo: string;
  setInfoMemo: (memo: string) => void;
  infoMemo: string;
}

const InfoModalComponent: React.FC<
  InfoModalComponentProps & {
    displaySection: "basicInfo" | "detailInfo" | "hospitalInfo" | "memoInfo";
  }
> = ({
  isOpen,
  onRequestClose,
  displaySection,
  setInfoImageSrc,
  setInfoName,
  infoName,
  setInfoBreed,
  infoBreed,
  setInfoBirthYear,
  infoBirthYear,
  setInfoBirthMonth,
  infoBirthMonth,
  setInfoBirthDate,
  infoBirthDate,
  setInfoGender,
  infoGender,
  setInfoNeutering,
  infoNeutering,
  setInfoAllergy,
  infoAllergy,
  setInfoMedicalHistory,
  infoMedicalHistory,
  setInfoMicrochipNumber,
  infoMicrochipNumber,
  setInfoHospitalName,
  infoHospitalName,
  setInfoPhoneNumber,
  infoPhoneNumber,
  setInfoDoctorName,
  infoDoctorName,
  setInfoHospitalMemo,
  infoHospitalMemo,
  setInfoMemo,
  infoMemo,
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

  // 名前（状態）
  const [name, setName] = useState(infoName);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  // 種類（状態）
  const [breed, setBreed] = useState(infoBreed);
  const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBreed = event.target.value;
    setBreed(newBreed);
  };

  // 誕生日（状態）
  const [birthYear, setBirthYear] = useState<number>(infoBirthYear);
  const [birthMonth, setBirthMonth] = useState<number>(infoBirthMonth);
  const [birthDate, setBirthDate] = useState<number>(infoBirthDate);

  const handleBirthYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthYear(parseInt(event.target.value));
  };

  const handleBirthMonthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthMonth(parseInt(event.target.value));
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthDate(parseInt(event.target.value));
  };

  //性別
  const [gender, setGender] = useState(infoGender);
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = event.target.value;
    setGender(newGender);
  };

  //避妊去勢手術
  const [neutering, setNeutering] = useState(infoNeutering);
  const handleNeuteringChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newNeutering = event.target.value;
    setNeutering(newNeutering);
  };

  //アレルギー
  const [allergy, setAllergy] = useState(infoAllergy);
  const handleAllergyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAllergy = event.target.value;
    setAllergy(newAllergy);
  };

  //既往歴
  const [medicalHistory, setMedicalHistory] = useState(infoMedicalHistory);
  const handleMedicalHistoryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newMedicalHistory = event.target.value;
    setMedicalHistory(newMedicalHistory);
  };

  //マイクロチップ番号
  const [microchipNumber, setMicrochipNumber] = useState(infoMicrochipNumber);
  const handleMicrochipNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMicrochipNumber = event.target.value;
    if (newMicrochipNumber.length <= 15) {
      setMicrochipNumber(newMicrochipNumber);
    }
  };

  //病院名
  const [hospitalName, setHospitalName] = useState(infoHospitalName);
  const handleHospitalNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHospitalName = event.target.value;
    setHospitalName(newHospitalName);
  };

  //電話番号
  const [phoneNumber, setPhoneNumber] = useState(infoPhoneNumber);
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  //担当の先生
  const [doctorName, setDoctorName] = useState(infoDoctorName);
  const handleDoctorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDoctorName = event.target.value;
    setDoctorName(newDoctorName);
  };

  //病院メモ
  const [hospitalMemo, setHospitalMemo] = useState(infoHospitalMemo);
  const handleHospitalMemoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newHospitalMemo = event.target.value;
    setHospitalMemo(newHospitalMemo);
  };

  //メモ
  const [memo, setMemo] = useState(infoMemo);
  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMemo = event.target.value;
    setMemo(newMemo);
  };

  // 送信イベント
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imageUrl) {
      setInfoImageSrc(imageUrl); // 画像のURLを更新
    }
    if (name) {
      setInfoName(name); // 名前を更新
    }
    if (breed) {
      setInfoBreed(breed); // 種類を更新
    }
    if (birthYear && birthMonth && birthDate) {
      // 誕生日を更新
      setInfoBirthYear(birthYear);
      setInfoBirthMonth(birthMonth);
      setInfoBirthDate(birthDate);
    }
    if (gender) {
      setInfoGender(gender); // 性別を更新
    }
    if (neutering) {
      setInfoNeutering(neutering); // 避妊去勢を更新
    }
    if (allergy) {
      setInfoAllergy(allergy); // アレルギーを更新
    }
    if (medicalHistory) {
      setInfoMedicalHistory(medicalHistory); // 既往歴を更新
    }
    if (microchipNumber) {
      setInfoMicrochipNumber(microchipNumber); // マイクロチップ番号を更新
    }
    if (hospitalName) {
      setInfoHospitalName(hospitalName); // 病院名を更新
    }
    if (phoneNumber) {
      setInfoPhoneNumber(phoneNumber); // 電話番号を更新
    }
    if (doctorName) {
      setInfoDoctorName(doctorName); // 担当の先生を更新
    }
    if (hospitalMemo) {
      setInfoHospitalMemo(hospitalMemo); // 病院メモを更新
    }
    if (memo) {
      setInfoMemo(memo); // メモを更新
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
        if (imageUrl) {
          setInfoImageSrc(imageUrl); // 画像のURLを更新
        }
      }}
      overlayClassName="overlay"
      className="modal__contentWrap"
    >
      <button onClick={onRequestClose} className="modal__exitButton">
        <img alt="" src={img_exitButton} />
      </button>
      <div className="modal__content">
        <div className="modal__inner">
          <form className="modal__form" onSubmit={handleSubmit}>
            {/* 基本情報 */}
            {displaySection === "basicInfo" && (
              <div className="infoSection">
                <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
                  基本情報
                </h3>
                <table className="modalList infoList infoList__basic">
                  <tbody>
                    {/* 写真 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="petImage" htmlFor="petImage">
                          写真
                        </label>
                      </th>
                      <td className="attachment">
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
                      </td>
                    </tr>
                    {/* 名前 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="petName" htmlFor="petName">
                          名前
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="petName"
                          name="petName"
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                        />
                      </td>
                    </tr>
                    {/* 種類 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="petBreed" htmlFor="petBreed">
                          種類
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="petBreed"
                          name="petBreed"
                          type="text"
                          value={breed}
                          onChange={handleBreedChange}
                        />
                      </td>
                    </tr>
                    {/* 誕生日 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="petBirthday" htmlFor="petBirthday">
                          誕生日
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField petBirthYearInputField"
                          id="petBirthYearInputField"
                          name="petBirthYearInputField"
                          type="number"
                          value={birthYear}
                          onChange={handleBirthYearChange}
                        />
                        年
                        <input
                          className="styledInputField petBirthMonthInputField"
                          id="petBirthMonthInputField"
                          name="petBirthMonthInputField"
                          type="number"
                          value={birthMonth}
                          onChange={handleBirthMonthChange}
                        />
                        月
                        <input
                          className="styledInputField petBirthDateInputField"
                          id="petBirthDateInputField"
                          name="petBirthDateInputField"
                          type="number"
                          value={birthDate}
                          onChange={handleBirthDateChange}
                        />
                        日
                      </td>
                    </tr>
                    {/* 性別 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="petGenderLabel" htmlFor="petGender">
                          性別
                        </label>
                      </th>
                      <td className="modalList__inputField modalList__inputSelect">
                        <select
                          className="styledInputField modalList__selectType"
                          id="petGender"
                          name="petGender"
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <option value="男の子">男の子</option>
                          <option value="女の子">女の子</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 詳細情報 */}
            {displaySection === "detailInfo" && (
              <div className="infoSection">
                <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
                  詳細情報
                </h3>
                <table className="modalList infoList infoList__detail">
                  <tbody>
                    {/* 避妊・去勢 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="neuteringLabel"
                          htmlFor="neuteringStatus"
                        >
                          避妊・去勢
                        </label>
                      </th>
                      <td className="modalList__inputField modalList__inputSelect">
                        <select
                          className="styledInputField modalList__selectType"
                          id="neuteringStatus"
                          name="neuteringStatus"
                          value={neutering}
                          onChange={handleNeuteringChange}
                        >
                          <option value="不明">不明</option>
                          <option value="済み">済み</option>
                          <option value="未">未</option>
                        </select>
                      </td>
                    </tr>

                    {/* アレルギー */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="allergyLabel" htmlFor="allergy">
                          アレルギー
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          className="styledInputField tallInputField"
                          id="allergy"
                          name="allergy"
                          value={allergy}
                          onChange={handleAllergyChange}
                        />
                      </td>
                    </tr>

                    {/* 既往歴 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="medicalHistoryLabel"
                          htmlFor="medicalHistory"
                        >
                          既往歴
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          className="styledInputField tallInputField"
                          id="medicalHistory"
                          name="medicalHistory"
                          value={medicalHistory}
                          onChange={handleMedicalHistoryChange}
                        />
                      </td>
                    </tr>

                    {/* マイクロチップ番号 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="microchipNumberLabel"
                          htmlFor="microchipNumber"
                        >
                          マイクロチップ番号
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="microchipNumber"
                          name="microchipNumber"
                          type="number"
                          value={microchipNumber}
                          onChange={handleMicrochipNumberChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 病院情報 */}
            {displaySection === "hospitalInfo" && (
              <div className="infoSection">
                <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
                  病院情報
                </h3>
                <table className="modalList infoList infoList__detail">
                  <tbody>
                    {/* 病院名 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="hospitalNameLabel"
                          htmlFor="hospitalName"
                        >
                          病院名
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="hospitalName"
                          name="hospitalName"
                          type="text"
                          value={hospitalName}
                          onChange={handleHospitalNameChange}
                        />
                      </td>
                    </tr>

                    {/* 電話番号 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="phoneNumberLabel"
                          htmlFor="phoneNumber"
                        >
                          電話番号
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </td>
                    </tr>

                    {/* 担当の先生 */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label className="labelDoctor" htmlFor="doctorName">
                          担当の先生
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <input
                          className="styledInputField fullWidthInputField"
                          id="doctorName"
                          name="doctorName"
                          type="text"
                          value={doctorName}
                          onChange={handleDoctorNameChange}
                        />
                      </td>
                    </tr>

                    {/* 病院メモ */}
                    <tr className="modalList__item modalList__item--info">
                      <th className="modalList__heading">
                        <label
                          className="hospitalMemoLabel"
                          htmlFor="hospitalMemo"
                        >
                          病院メモ
                        </label>
                      </th>
                      <td className="modalList__inputField">
                        <textarea
                          className="styledInputField tallInputField"
                          id="hospitalMemo"
                          name="hospitalMemo"
                          value={hospitalMemo}
                          onChange={handleHospitalMemoChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* メモ*/}
            {displaySection === "memoInfo" && (
              <div className="infoSection">
                <h3 className="infoPage__subHeading page__subHeading page__subHeading--infoPage">
                  メモ
                </h3>
                <table className="modalList infoList infoList__detail">
                  <tbody>
                    <tr className="modalList__item modalList__item--info">
                      <td className="modalList__inputField infoFoodList">
                        <textarea
                          className="styledInputField memoInputField"
                          id="Memo"
                          name="Memo"
                          value={memo}
                          onChange={handleMemoChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="modal__buttonWrap modalButton__wrap">
              <button
                className="button modal__button button--white"
                type="submit"
              >
                閉じる
              </button>
              <button
                className="button modal__button button--orange"
                type="submit"
              >
                入力
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModalComponent;
