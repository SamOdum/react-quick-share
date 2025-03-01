import { fireEvent, render, screen } from '@testing-library/react';
import { Email, Facebook, Linkedin, Pinterest, Print, Telegram, Twitter, Whatsapp } from '../components/Button';
import * as shareFunctionsModule from '../config/shareFunctions';

const testURL = 'http://www.example.com';

jest.mock('../config/shareFunctions', () => ({
    printPage: jest.fn(),
    sendEmail: jest.fn(),
    shareLink: jest.fn(),
    shareOnWhatsapp: jest.fn(),
    shareOnTwitter: jest.fn(),
    shareOnFacebook: jest.fn(),
    shareOnPinterest: jest.fn(),
    shareOnLinkedin: jest.fn(),
    shareOnTelegram: jest.fn(),
}));

describe('Share Buttons', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle Print button correctly', () => {
        render(<Print url={testURL}>Print</Print>);
        fireEvent.click(screen.getByText('Print'));
        expect(shareFunctionsModule.printPage).toHaveBeenCalled();
    });

    it('should handle Email button correctly', () => {
        render(
            <Email url={testURL} subject="Test Subject">
                Email
            </Email>
        );
        fireEvent.click(screen.getByText('Email'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, 'Test Subject');
    });

    it('should handle Whatsapp button correctly', () => {
        render(<Whatsapp url={testURL}>Whatsapp</Whatsapp>);
        fireEvent.click(screen.getByText('Whatsapp'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('whatsapp', testURL);
    });

    it('should handle Twitter button correctly', () => {
        render(<Twitter url={testURL}>Twitter</Twitter>);
        fireEvent.click(screen.getByText('Twitter'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('twitter', testURL);
    });

    it('should handle Facebook button correctly', () => {
        render(<Facebook url={testURL}>Facebook</Facebook>);
        fireEvent.click(screen.getByText('Facebook'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('facebook', testURL);
    });

    it('should handle Pinterest button correctly', () => {
        render(<Pinterest url={testURL}>Pinterest</Pinterest>);
        fireEvent.click(screen.getByText('Pinterest'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('pinterest', testURL);
    });

    it('should handle Linkedin button correctly', () => {
        render(<Linkedin url={testURL}>Linkedin</Linkedin>);
        fireEvent.click(screen.getByText('Linkedin'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('linkedin', testURL);
    });

    it('should handle Telegram button correctly', () => {
        render(<Telegram url={testURL}>Telegram</Telegram>);
        fireEvent.click(screen.getByText('Telegram'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('telegram', testURL);
    });
});
