import 'mocha';
import { cleanup } from '@testing-library/react';
import * as chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);

afterEach(() => cleanup());