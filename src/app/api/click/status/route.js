import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request) {
  try {
    // Получаем данные из переменных окружения
    const serviceId = process.env.CLICK_SERVICE_ID;
    const merchantId = process.env.CLICK_MERCHANT_ID;
    const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
    const secretKey = process.env.CLICK_SECRET_KEY;
    
    // Проверяем наличие всех необходимых переменных окружения
    if (!serviceId || !merchantId || !merchantUserId || !secretKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Отсутствуют необходимые переменные окружения',
        missingEnvVars: {
          serviceId: !serviceId,
          merchantId: !merchantId,
          merchantUserId: !merchantUserId,
          secretKey: !secretKey
        }
      }, { status: 500 });
    }
    
    // Проверяем доступность API Click и корректность учетных данных
    try {
      // Проверяем доступность основного домена Click
      const clickAvailable = await checkDomainAvailability('https://my.click.uz');
      
      // Проверяем доступность API Click
      const apiAvailable = await checkDomainAvailability('https://api.click.uz');
      
      // Формируем тестовую подпись для проверки
      const testOrderId = Date.now().toString();
      const testSignTime = Date.now();
      const testSignString = `${serviceId}${testOrderId}${testSignTime}${secretKey}`;
      const testSign = crypto.createHash('md5').update(testSignString).digest('hex');
      
      // Формируем тестовый URL для платежа (не выполняем запрос)
      const testClickUrl = `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=1000&transaction_param=${testOrderId}&return_url=https://example.com&card_type=uzcard&sign_time=${testSignTime}&sign_string=${testSign}`;
      
      return NextResponse.json({
        status: 'success',
        message: 'Проверка подключения к Click выполнена',
        availability: {
          clickDomain: clickAvailable,
          apiDomain: apiAvailable
        },
        config: {
          serviceId,
          merchantId,
          merchantUserId,
          hasSecretKey: !!secretKey
        },
        testSignature: {
          timestamp: testSignTime,
          orderId: testOrderId,
          signString: testSignString,
          sign: testSign
        },
        testPaymentUrl: testClickUrl,
        instructions: [
          'Проверьте правильность учетных данных в файле .env.local',
          'Убедитесь, что домены Click доступны из вашей сети',
          'Проверьте формирование подписи для запроса',
          'Для тестирования платежа используйте кнопку "Купить" на странице тура'
        ]
      });
    } catch (error) {
      console.error('Ошибка при проверке доступности Click:', error);
      return NextResponse.json({
        status: 'error',
        message: 'Ошибка при проверке доступности Click',
        error: error.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Ошибка при проверке статуса подключения к Click:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Внутренняя ошибка сервера',
      error: error.message
    }, { status: 500 });
  }
}

// Функция для проверки доступности домена
async function checkDomainAvailability(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Таймаут 5 секунд
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual' // Не следовать за редиректами
    });
    
    clearTimeout(timeoutId);
    
    // Считаем домен доступным, если получили любой ответ (даже с ошибкой)
    return true;
  } catch (error) {
    // Если произошла ошибка сети, домен недоступен
    return false;
  }
} 