import { Button, Form, Input } from "antd";
import type { IRegisterForm } from "../types/IRegisterForm";
type ILoginForm = Pick<IRegisterForm, "email" | "password">;

const LoginPage = () => {
    const [form] = Form.useForm<ILoginForm>();
    const onSubmitHandler = (values: ILoginForm) => {
        console.log("Login Data:", values);
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
            <div className="w-full max-w-sm space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
                        Вхід на сайт
                    </h2>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmitHandler}
                    requiredMark={false}
                    className="mt-8 space-y-4"
                >
                    <Form.Item<ILoginForm>
                        label="Електронна пошта"
                        name="email"
                        rules={[
                            { required: true, message: 'Вкажіть почту!' },
                            { type: 'email', message: 'Невірний формат!' }
                        ]}
                    >
                        <Input size="large" placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item<ILoginForm>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Вкажіть пароль!' }]}
                    >
                        <Input.Password size="large" placeholder="********" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            className="bg-indigo-600"
                        >
                            Увійти
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-sm text-gray-600">
                    Ще не зареєстровані?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Створити аккаунт
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;