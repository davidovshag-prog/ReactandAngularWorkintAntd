import {Button, Form, Input} from "antd";
import type {IRegisterForm} from "../types/IRegisterForm.ts";
import {UserOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import {useState} from "react";
import type {RcFile} from "antd/es/upload";

const RegisterPage = () =>
{
    //Ми створили форму
    const [form] = Form.useForm<IRegisterForm>();

    const [myFileUpload, setMyFileUpload] =
        useState<RcFile|undefined>(undefined);

    //Коли будемо нажимати кнопку реєстрація
    const onSubmitHandler = (values: IRegisterForm) => {
        console.log("Submit Result", values);
    }


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
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Вкажіть підтвердження паролю" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Паролі не співпадають!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item<IRegisterForm>
                            label={"Завантаження фото"}
                            name={"image"}
                            rules={[{required: true, message: "Додайте фото."}]}
                            valuePropName={"fileList"}
                            getValueFromEvent={(e: any) => e?.fileList}
                        >
                        <Dragger name={'file'}
                                 multiple={false}
                                 beforeUpload = { (file) => {
                                     console.log('Selected file:', file);
                                     return false;
                                 }}
                                 onChange = {(info) => {
                                     console.log("info", info);
                                     setMyFileUpload(info.file.originFileObj);
                                     // console.log("info", info.file.originFileObj);
                                 }}
                        >
                            <p className="ant-upload-drag-icon">
                                {myFileUpload != undefined ?
                                    <img src={URL.createObjectURL(myFileUpload)}
                                         width="150px" alt=""/>
                                    :
                                    <UserOutlined />
                                }
                            </p>
                            <p className="ant-upload-text">
                                Натисніть або перетягніть файл у цю область, щоб завантажити
                            </p>
                            <p className="ant-upload-hint">
                                Оберіть один файл для вашого фото
                            </p>
                        </Dragger>
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