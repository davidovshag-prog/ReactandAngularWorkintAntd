import {Button, Form, Input, Upload} from "antd";
import type {IRegisterForm} from "../types/IRegisterForm.ts";
import {UserOutlined} from "@ant-design/icons";
import {useState} from "react";

const RegisterPage = () =>
{
    //Ми створили форму
    const [form] = Form.useForm<IRegisterForm>();

    const [myFileUpload, setMyFileUpload] =
        useState<File|null>(null);

    //Коли будемо нажимати кнопку реєстрація
    const onSubmitHandler = (values: IRegisterForm) => {
        console.log("Submit Result", values);
    }

    //Коли ми обрали файл із зображенням
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        const n = e?.fileList.length;

        if(n<1){
            setMyFileUpload(null);
            return e?.fileList;}
        setMyFileUpload(e?.fileList[n-1].originFileObj);
        // console.log("select file", e?.fileList[n-1]);
        return [e?.fileList[n-1]];
    };


    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Реєстрація
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form form = {form}
                          onFinish={onSubmitHandler}
                          layout={"vertical"}
                    >
                        <Form.Item<IRegisterForm>
                            label={"Прізвище"}
                            name={"lastName"}
                            rules={[{required: true, message: "Вкажіть прізвище"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Ім'я"}
                            name={"firstName"}
                            rules={[{required: true, message: "Вкажіть ім'я"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Побатькові"}
                            name={"middleName"}
                            rules={[{required: true, message: "Вкажіть побатькові"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Електронна пошта"}
                            name={"email"}
                            rules={[{required: true, message: "Вкажіть пошта"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Телефон"}
                            name={"phone"}
                            rules={[{required: true, message: "Вкажіть телефон"}]}
                        >
                            <Input/>
                        </Form.Item>



                        <Form.Item<IRegisterForm>
                            label={"Пароль"}
                            name={"password"}
                            rules={[{required: true, message: "Вкажіть пароль"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Підтвердження паролю"}
                            name={"confirmPassword"}
                            rules={[{required: true, message: "Вкажіть підтвердження паролю"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Оберіть фото">
                            <Form.Item<IRegisterForm> name="image" valuePropName="fileList"
                                                      getValueFromEvent={normFile}
                                                      noStyle>
                                <Upload.Dragger name="files" multiple={false}
                                                listType="picture"
                                                accept={"image/*"}
                                                beforeUpload={() => {return false;}}
                                >
                                    <p className="ant-upload-drag-icon">
                                        { myFileUpload ?
                                            <img src={URL.createObjectURL(myFileUpload)}
                                                 width={200}/>
                                            :
                                            <UserOutlined />
                                        }
                                    </p>
                                    <p className="ant-upload-text">Натисніть або перетягніть фото</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <div className={"pt-4 flex justify-center"}>
                            <Form.Item label = {null}>
                                <Button type={"primary"} htmlType={"submit"}>
                                    Реєструватися
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;