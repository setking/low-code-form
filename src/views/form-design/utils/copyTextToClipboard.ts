import { ElMessage } from 'element-plus';
export function copyText(text: string, prompt: string | null = '已成功复制到剪切板!') {
  navigator.clipboard.writeText(text).then(
    function () {
      prompt &&
        ElMessage.success({
          message: prompt,
          type: 'success',
        });
    },
    function (error: Error) {
      ElMessage.error('复制失败!' + error.message);
    },
  );
}
