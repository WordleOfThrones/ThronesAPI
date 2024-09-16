"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const character_1 = __importDefault(require("./routes/character"));
const dataService_1 = require("./services/dataService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
node_cron_1.default.schedule('0 0 * * *', () => {
    console.log('Executando inserção diária de personagens.');
    (0, dataService_1.inserirRegistrosDiarios)();
});
app.use('/api/users', user_1.default);
app.use('/api/characters', character_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/api', (req, res) => {
    res.send('API funcionando');
});
